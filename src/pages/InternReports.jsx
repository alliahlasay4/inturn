import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import UploadModal from "../components/Intern/UploadModal";
import DailyReportModal from "../components/Intern/DailyReportModal";
import DocumentModal from "../components/Intern/DocumentModal";
import WelcomeCard from "../components/Intern/WelcomeCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useDocuments } from "../context/DocumentsContext";

import "../styles/reports.css";

export default function InternReports() {
  const navigate = useNavigate();


  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };
  const location = useLocation();

  /* =======================
     STATE
  ======================= */

  const [activeModal, setActiveModal] = useState(null);
  const [submissionType, setSubmissionType] = useState("");
  const [reportDate, setReportDate] = useState("");


  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const handleViewDocument = (doc) => {
    setSelectedDocument(doc);
    setIsEditing(false);

    if (doc.type === "Daily Report") {
      setActiveModal("daily-report");
    } else {
      setActiveModal("document");
    }
  };



  const { documents, setDocuments } = useDocuments();

  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");



  /* =======================
     EFFECTS
  ======================= */
  useEffect(() => {
    if (!location.state?.openFromDashboard) return;

    const type = location.state.submissionType;
    const latestDocument = documents
      .filter(doc => doc.type === type)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];


    if (!latestDocument) return;

    setSelectedDocument(latestDocument);
    setIsEditing(false);

    if (type === "Daily Report") {
      setActiveModal("daily-report");
    }

    if (type === "Document") {
      setActiveModal("document");
    }

    navigate(location.pathname, { replace: true });

  }, [location.state, documents, navigate, location.pathname]);


  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  /* =======================
     HELPERS
  ======================= */

  const handleCloseAll = () => {
    setActiveModal(null);
    setSubmissionType("");
    setReportDate("");
    setSelectedDocument(null);
    setIsEditing(false);
  };


  const handleSubmitDocument = (data) => {
    const isDaily = data.type === "daily-report";

    const newDocument = {
      id: Date.now(),
      type: isDaily ? "Daily Report" : "Document",
      fileName: data.file.name,
      file: data.file,
      date: data.date,
      status: "Pending",
      remarks: "—",

      // Daily Report fields
      title: isDaily ? data.title : null,
      tasks: isDaily ? data.tasks : null,
      challenges: isDaily ? data.challenges : null,

      // Document fields
      comment: !isDaily ? data.comment : null
    };

    setDocuments(prev => [newDocument, ...prev]);

    showToast(
      isDaily
        ? "Daily report submitted successfully."
        : "Document submitted successfully."
    );

    handleCloseAll();
  };


  const handleSaveChanges = (updatedDoc) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === updatedDoc.id ? updatedDoc : doc
      )
    );

    showToast("Changes saved successfully.");
    handleCloseAll();
  };



  const filteredDocuments = documents
    .filter(doc => {
      const matchesStatus =
        statusFilter === "all" || doc.status === statusFilter;

      const matchesSearch =
        doc.type.toLowerCase().includes(search.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="reports-page">
      <WelcomeCard title="Reports" />

      {/* REPORTS TABLE */}
      <div className="card reports-card">
        <div className="reports-header">
          <h3>Submitted Documents</h3>

          <div className="reports-actions">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>



            <div className="filter-wrapper">
              <button
                className="filter-btn"
                onClick={() => setFilterOpen(prev => !prev)}
              >
                Filter ▾
              </button>

              {filterOpen && (
                <div className="filter-dropdown">
                  <button onClick={() => { setStatusFilter("all"); setFilterOpen(false); }}>
                    All
                  </button>
                  <button onClick={() => { setStatusFilter("Verified"); setFilterOpen(false); }}>
                    Verified
                  </button>
                  <button onClick={() => { setStatusFilter("Pending"); setFilterOpen(false); }}>
                    Pending
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Document Type</th>
                <th>File Name</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th>Admin Remarks</th>
                <th>Actions</th>


              </tr>

            </thead>

            <tbody>
              {paginatedDocuments.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", opacity: 0.6 }}>
                    No reports found
                  </td>
                </tr>
              ) : (
                paginatedDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.type}</td>
                    <td>{doc.fileName}</td>
                    <td>{doc.date}</td>
                    <td>
                      <span className={`status ${doc.status.toLowerCase()}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td>{doc.remarks}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleViewDocument(doc)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>



          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>

            </div>
          )}

        </div>
      </div>

      {/* UPLOAD BUTTON */}
      <button
        className="upload-btn"
        onClick={() => setActiveModal("upload")}
      >
        ⬇ File Upload
      </button>

      {/* MODALS */}
      {activeModal === "upload" && (
        <UploadModal
          submissionType={submissionType}
          setSubmissionType={setSubmissionType}
          reportDate={reportDate}
          setReportDate={setReportDate}
          onClose={handleCloseAll}
          onContinue={() => {
            if (submissionType === "daily-report") {
              setActiveModal("daily-report");
            }
            if (submissionType === "document") {
              setActiveModal("document");
            }
          }}
        />
      )}

      {activeModal === "daily-report" && (
        <DailyReportModal
          date={selectedDocument?.date || reportDate}
          documentData={selectedDocument}
          isEditing={selectedDocument ? isEditing : true}
          setIsEditing={setIsEditing}
          onSubmit={handleSubmitDocument}
          onSaveChanges={handleSaveChanges}
          onClose={handleCloseAll}
        />
      )}



      {activeModal === "document" && (
        <DocumentModal
          date={selectedDocument?.date || reportDate}
          documentData={selectedDocument}
          isEditing={selectedDocument ? isEditing : true}
          setIsEditing={setIsEditing}
          onSubmit={handleSubmitDocument}
          onSaveChanges={handleSaveChanges}
          onClose={handleCloseAll}
        />
      )}


      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

    </div>
  );
}
