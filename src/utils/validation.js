export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    // At least 8 characters
    return password.length >= 8;
  };
  
  export const validateRequired = (value) => {
    return value && value.trim() !== '';
  };
  
  export const validatePhoneNumber = (phone) => {
    // Basic phone validation (10-11 digits)
    const regex = /^[0-9]{10,11}$/;
    return regex.test(phone.replace(/\D/g, ''));
  };
  
const normalizeText = (value) => (value ?? '').toString().trim();

export const required = (message = 'This field is required') => (value) =>
  validateRequired(normalizeText(value)) ? null : message;

export const email = (message = 'Invalid email format') => (value) => {
  const next = normalizeText(value);
  if (!next) {
    return null;
  }
  return validateEmail(next) ? null : message;
};

export const phone = (message = 'Invalid phone number') => (value) => {
  const next = normalizeText(value);
  if (!next) {
    return null;
  }
  return validatePhoneNumber(next) ? null : message;
};

export const minLength = (length, message) => (value) => {
  const next = normalizeText(value);
  if (!next) {
    return null;
  }
  return next.length >= length ? null : message || `Must be at least ${length} characters`;
};

export const maxLength = (length, message) => (value) => {
  const next = normalizeText(value);
  if (!next) {
    return null;
  }
  return next.length <= length ? null : message || `Must be at most ${length} characters`;
};

export const oneOf = (options, message) => (value) => {
  if (!value) {
    return null;
  }
  return options.includes(value) ? null : message || 'Invalid selection';
};

export const matchField = (otherField, message) => (value, values) => {
  const next = normalizeText(value);
  if (!next) {
    return null;
  }
  return next === normalizeText(values?.[otherField]) ? null : message || 'Values do not match';
};

const parseDateValue = (value) => {
  const next = normalizeText(value);
  if (!next) {
    return null;
  }
  const normalized = next.replace(/\s+/g, '');
  const slashMatch = normalized.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (slashMatch) {
    const month = Number(slashMatch[1]);
    const day = Number(slashMatch[2]);
    const year = Number(slashMatch[3]);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
      return date;
    }
  }
  const isoMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
      return date;
    }
  }
  return null;
};

export const date = (message = 'Invalid date') => (value) => (parseDateValue(value) ? null : message);

export const dateBefore = (otherField, message) => (value, values) => {
  const current = parseDateValue(value);
  const other = parseDateValue(values?.[otherField]);
  if (!current || !other) {
    return null;
  }
  return current <= other ? null : message || 'Date must be before the end date';
};

export const dateAfter = (otherField, message) => (value, values) => {
  const current = parseDateValue(value);
  const other = parseDateValue(values?.[otherField]);
  if (!current || !other) {
    return null;
  }
  return current >= other ? null : message || 'Date must be after the start date';
};

export const fileRequired = (message = 'Please upload a file') => (value) => (value ? null : message);

export const fileType = (extensions, message) => (value) => {
  if (!value) {
    return null;
  }
  const name = value.name || '';
  const ext = name.split('.').pop()?.toLowerCase();
  return extensions.includes(ext) ? null : message || 'Unsupported file type';
};

export const fileSize = (maxBytes, message) => (value) => {
  if (!value) {
    return null;
  }
  return value.size <= maxBytes ? null : message || 'File is too large';
};

export const digitsLength = (length, message) => (value) => {
  const next = normalizeText(value).replace(/\D/g, '');
  if (!next) {
    return null;
  }
  return next.length === length ? null : message || `Must be ${length} digits`;
};

  // Form validation helper
  export const validateForm = (fields, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const value = fields[field];
      const fieldRules = rules[field];
      
      if (fieldRules.required && !validateRequired(value)) {
        errors[field] = `${field} is required`;
      }
      
      if (fieldRules.email && !validateEmail(value)) {
        errors[field] = 'Invalid email format';
      }
      
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        errors[field] = `Must be at least ${fieldRules.minLength} characters`;
      }
    });
    
    return errors;
  };