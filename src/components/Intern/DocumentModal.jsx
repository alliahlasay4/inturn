import { useState, useEffect } from "react";

export default function DocumentModal({
  date,
  documentData,
  isEditing,
  setIsEditing,
  onSubmit,
  onSaveChanges,
  onClose
}) {

  const [comment, setComment] = useState("");
  useEffect(() => {
    if (documentData) {
      setComment(documentData.comment || "");
      setFile(null);
    }
  }, [documentData]);


  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="modal-overlay">
      <div className="document-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h3>Document</h3>
        <p className="modal-subtext">
          Submit your internship documents here.
        </p>

        <div className="form-group">
          <label>
            Date <span className="required">*</span>
          </label>
          <input type="date" value={date} disabled />
        </div>

        <div className="form-group">
          <label>Comment (Optional)</label>
          <textarea
            className="form-textarea"
            placeholder="Add a brief note or explanation about this document (optional)"
            value={comment}
            disabled={!isEditing && documentData}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />


        </div>


        <div className="form-group">
          <label>
            Attach Files <span className="required">*</span>
          </label>

          <input
            type="file"
            disabled={!isEditing && documentData}
            id="document-upload"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={(e) => {
              setFile(e.target.files[0]);
              setError("");
            }}
          />

          <label
            htmlFor="document-upload"
            className={`file-drop ${error ? "error" : ""}`}
          >
            <div className="file-icon">☁</div>
            <p>
              {file
                ? file.name
                : documentData?.fileName || "Click to upload or drag and drop"}
            </p>
            <span>PDF, DOC, DOCX (max. 100MB)</span>
          </label>

          {error && <p className="form-error">{error}</p>}

        </div>

        <div className="modal-actions center">
          {/* VIEW MODE */}
          {documentData && !isEditing && (
            <button
              className="btn-submit"
              onClick={() => setIsEditing(true)}
            >
              ✎ Edit
            </button>
          )}

          {/* CREATE MODE */}
          {!documentData && (
            <button
              className="btn-submit"
              onClick={() => {
                if (!file) {
                  setError("Please attach a document before submitting.");
                  return;
                } onSubmit({

                  type: "document",
                  file,
                  comment,
                  date
                });

              }}
            >
              ⬆ Submit Document
            </button>
          )}

          {/* EDIT MODE */}
          {documentData && isEditing && (
            <button
              className="btn-submit save-mode"
              onClick={() =>
                onSaveChanges({
                  ...documentData,
                  comment,
                  file
                })
              }
            >
              💾 Save Changes
            </button>
          )}

          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div >
  );
}
