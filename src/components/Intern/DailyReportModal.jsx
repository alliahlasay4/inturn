import { useState, useEffect } from "react";


export default function DailyReportModal({
  date,
  documentData,
  isEditing,
  setIsEditing,
  onSubmit,
  onSaveChanges,
  onClose
}) {



  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");
  const [challenges, setChallenges] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (documentData) {
      setTitle(documentData.title);
      setTasks(documentData.tasks);
      setChallenges(documentData.challenges);
      setFile(null); // keep old unless replaced
    }
  }, [documentData]);


  const handleSubmit = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Report title is required.";
    if (!tasks.trim()) newErrors.tasks = "Please list tasks completed.";
    if (!challenges.trim()) newErrors.challenges = "Please describe challenges faced.";
    if (!file) newErrors.file = "Please attach a file before submitting.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      type: "daily-report",
      title,
      tasks,
      challenges,
      file,
      date
    });

  };


  return (
    <div className="modal-overlay">
      <div className="daily-report-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h3>Daily Report</h3>
        <p className="modal-subtext">
          Document your daily accomplishment and progress
        </p>

        {/* DATE */}
        <div className="form-group">
          <label>
            Report Date <span className="required">*</span>
          </label>
          <input type="date" value={date} disabled />
        </div>

        {/* TITLE */}
        <div className="form-group">
          <label>
            Report Title <span className="required">*</span>
          </label>
          <input
            type="text"
            value={title}
            disabled={!isEditing && documentData}
            placeholder="e.g., Project Development Progress"
            className={errors.title ? "input-error" : ""}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors(prev => ({ ...prev, title: "" }));
            }}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        {/* TASKS */}
        <div className="form-group">
          <label>
            Task Completed <span className="required">*</span>
          </label>
          <textarea
            className={`form-textarea ${errors.tasks ? "input-error" : ""}`}
            placeholder="List completed task (one per line)..."
            rows={3}
            value={tasks}
            disabled={!isEditing && documentData}
            onChange={(e) => {
              setTasks(e.target.value);
              setErrors(prev => ({ ...prev, tasks: "" }));
            }}
          />
          {errors.tasks && <p className="form-error">{errors.tasks}</p>}
        </div>

        {/* CHALLENGES */}
        <div className="form-group">
          <label>
            Challenges Faced <span className="required">*</span>
          </label>
          <textarea
            className={`form-textarea ${errors.challenges ? "input-error" : ""}`}
            placeholder="Any obstacle or challenges encountered..."
            rows={3}
            disabled={!isEditing && documentData}
            value={challenges}
            onChange={(e) => {
              setChallenges(e.target.value);
              setErrors(prev => ({ ...prev, challenges: "" }));
            }}
          />
          {errors.challenges && (
            <p className="form-error">{errors.challenges}</p>
          )}
        </div>

        {/* FILE (OPTIONAL) */}
        <div className="form-group">
          <label>
            Attach Files <span className="required">*</span>
          </label>

          <input
            type="file"
            disabled={!isEditing && documentData}
            id="daily-upload"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={(e) => {
              setFile(e.target.files[0]);
              setErrors(prev => ({ ...prev, file: "" }));
            }}
          />

          <label
            htmlFor="daily-upload"
            className={`file-drop ${errors.file ? "error" : ""}`}
          >
            <div className="file-icon">☁</div>
            <p>
              {file
                ? file.name
                : documentData?.fileName || "Click to upload or drag and drop"}
            </p>
            <span>PDF, DOC, DOCX (max. 100MB)</span>
          </label>

          {errors.file && <p className="form-error">{errors.file}</p>}
        </div>


        {/* ACTIONS */}
        <div className="modal-actions center">
          {!isEditing && (
            <button className="btn-submit" onClick={() => setIsEditing(true)}>
              ✎ Edit
            </button>
          )}

          {isEditing && documentData && (
            <button
              className="btn-submit save-mode"
              onClick={() =>
                onSaveChanges({
                  ...documentData,
                  title,
                  tasks,
                  challenges,
                  file
                })
              }
            >
              💾 Save Changes
            </button>
          )}
          {/* CREATE MODE */}
          {!documentData && (
            <button className="btn-submit" onClick={handleSubmit}>
              ⬆ Submit Report
            </button>
          )}


          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
