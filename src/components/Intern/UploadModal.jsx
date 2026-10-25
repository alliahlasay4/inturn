import { useState } from "react";

export default function UploadModal({
  onClose,
  onContinue,
  submissionType,
  setSubmissionType,
  reportDate,
  setReportDate,
}) {
  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    const newErrors = {};

    if (!reportDate) {
      newErrors.date = "Please select a date.";
    }

    if (!submissionType) {
      newErrors.type = "Please select a submission type.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onContinue();
  };

  return (
    <div className="modal-overlay">
      <div className="upload-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h3>Document / Report</h3>
        <p className="modal-subtext">
          Submit your document/report of work and progress.
        </p>

        {/* DATE */}
        <div className="form-group">
          <label>
            Date <span className="required">*</span>
          </label>
          <input
            type="date"
            value={reportDate}
            max={new Date().toISOString().split("T")[0]}
            className={errors.date ? "input-error" : ""}
            onChange={(e) => {
              setReportDate(e.target.value);
              setErrors(prev => ({ ...prev, date: "" }));
            }}
          />
          {errors.date && <p className="form-error">{errors.date}</p>}
        </div>

        {/* SUBMISSION TYPE */}
        <div className="form-group">
          <label>
            Submission Type <span className="required">*</span>
          </label>
          <select
            value={submissionType}
            className={errors.type ? "input-error" : ""}
            onChange={(e) => {
              setSubmissionType(e.target.value);
              setErrors(prev => ({ ...prev, type: "" }));
            }}
          >
            <option value="">Select type</option>
            <option value="document">Documents</option>
            <option value="daily-report">Daily Report</option>
          </select>
          {errors.type && <p className="form-error">{errors.type}</p>}
        </div>

        {/* ACTIONS */}
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-submit" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
