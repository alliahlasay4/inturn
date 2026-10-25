import "../../styles/dashboard.css";
import { useDocuments } from "../../context/DocumentsContext";




export default function DocumentsSummary() {

  const { documents } = useDocuments();

  const pending = documents.filter(d => d.status === "Pending").length;
  const approved = documents.filter(d => d.status === "Verified").length;
  const rejected = documents.filter(d => d.status === "Rejected").length;
  return (
    <div className="card documents-summary-card">
      <div className="documents-summary-left">
        <h4>Documents</h4>
        <span>Submitted</span>
      </div>

      <div className="documents-summary-divider" />

      <div className="documents-summary-stats">
        <div>
          <p className="stat-value">{pending}</p>
          <p className="stat-label pending">Pending</p>
        </div>

        <div>
          <p className="stat-value">{approved}</p>
          <p className="stat-label approved">Approved</p>
        </div>

        <div>
          <p className="stat-value">{rejected}</p>
          <p className="stat-label rejected">Rejected</p>
        </div>
      </div>

    </div>
  );
}
