import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const normalizeValidators = (validators) => {
  if (!validators) {
    return {};
  }
  return Object.keys(validators).reduce((acc, key) => {
    const fieldValidators = validators[key];
    acc[key] = Array.isArray(fieldValidators) ? fieldValidators : [fieldValidators];
    return acc;
  }, {});
};

const runValidators = (value, values, validators = []) => {
  for (const validator of validators) {
    const error = validator?.(value, values);
    if (error) {
      return error;
    }
  }
  return null;
};

const useFormValidation = (
  initialValues,
  validators,
  { validateOnChange = false, validateOnBlur = true } = {}
) => {
  const normalizedValidators = useMemo(() => normalizeValidators(validators), [validators]);
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    initialValuesRef.current = initialValues;
  }, [initialValues]);

  const validateField = useCallback(
    (field, nextValue, nextValues) => {
      const value = typeof nextValue === 'undefined' ? values[field] : nextValue;
      const allValues = nextValues || values;
      const error = runValidators(value, allValues, normalizedValidators[field]);
      setErrors((prev) => {
        if (!error && !prev[field]) {
          return prev;
        }
        return { ...prev, [field]: error || undefined };
      });
      return error;
    },
    [normalizedValidators, values]
  );

  const validateForm = useCallback(
    (nextValues) => {
      const currentValues = nextValues || values;
      const nextErrors = {};
      Object.keys(normalizedValidators).forEach((field) => {
        const error = runValidators(currentValues[field], currentValues, normalizedValidators[field]);
        if (error) {
          nextErrors[field] = error;
        }
      });
      setErrors(nextErrors);
      return nextErrors;
    },
    [normalizedValidators, values]
  );

  const setFieldValue = useCallback(
    (field, value) => {
      setValues((prev) => {
        const nextValues = { ...prev, [field]: value };
        if (validateOnChange) {
          validateField(field, value, nextValues);
        }
        return nextValues;
      });
    },
    [validateField, validateOnChange]
  );

  const handleChange = useCallback(
    (field, value) => {
      setFieldValue(field, value);
    },
    [setFieldValue]
  );

  const handleBlur = useCallback(
    (field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      if (validateOnBlur) {
        validateField(field);
      }
    },
    [validateField, validateOnBlur]
  );

  const resetForm = useCallback((nextValues) => {
    const resolvedValues = typeof nextValues === 'undefined' ? initialValuesRef.current : nextValues;
    setValues(resolvedValues);
    setErrors({});
    setTouched({});
  }, []);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  return {
    values,
    errors,
    touched,
    setValues,
    setErrors,
    setTouched,
    setFieldValue,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    resetForm,
    isValid,
  };
};

export default useFormValidation;
