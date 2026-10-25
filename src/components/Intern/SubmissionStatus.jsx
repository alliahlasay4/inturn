import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

import { useDocuments } from "../../context/DocumentsContext";

export default function SubmissionStatus() {
  const navigate = useNavigate();
  const { documents } = useDocuments();

  const handleViewDetails = (type) => {
    navigate("/intern/reports", {
      state: {
        openFromDashboard: true,
        submissionType: type
      }
    });
  };

  const sortedDocuments = documents
    .slice()
    .sort((a, b) => b.id - a.id);


  return (
    <div className="card submission-card">
      <h3>Submission Status</h3>

      <div className="submission-list">

        {sortedDocuments.slice(0, 2).map((doc) => (
          <div key={doc.id} className="submission-item">
            <div className="submission-left">
              <FaFileAlt className="submission-icon" />
              <div className="submission-info">
                <h4>{doc.type}</h4>
                <p>
                  Status:
                  <span className={`status-text ${doc.status.toLowerCase()}`}>
                    {doc.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="submission-right">
              <span className="submission-time">{doc.date}</span>
              <button
                className="view-details"
                onClick={() => handleViewDetails(doc.type)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
        {documents.length === 0 && (
          <p style={{ opacity: 0.6 }}>No submissions yet</p>
        )}

      </div>

    </div>
  );
}
