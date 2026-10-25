import { createContext, useContext, useState } from "react";

const DocumentsContext = createContext();

const SEED_DOCUMENTS = [
  {
    id: 101,
    type: "Document",
    fileName: "Endorsement_Letter_Final.pdf",
    date: "2026-10-12",
    status: "Verified",
    remarks: "Approved by HR Coordinator",
    comment: "Official school endorsement letter signed by Dean."
  },
  {
    id: 102,
    type: "Document",
    fileName: "Medical_Clearance_Certificate.pdf",
    date: "2026-10-14",
    status: "Verified",
    remarks: "Fit to work cleared",
    comment: "Complete physical and lab examination results."
  },
  {
    id: 103,
    type: "Daily Report",
    fileName: "Daily_Accomplishment_Report_Oct15.pdf",
    title: "Onboarding, Git Setup & Architecture Walkthrough",
    date: "2026-10-15",
    status: "Verified",
    remarks: "Good start on repository setup.",
    tasks: "Completed environment configuration, attended orientation session, reviewed repository guidelines.",
    challenges: "Initial merge conflict resolution in staging branch."
  },
  {
    id: 104,
    type: "Daily Report",
    fileName: "Daily_Accomplishment_Report_Oct16.pdf",
    title: "Component Refactoring & Figma Alignment",
    date: "2026-10-16",
    status: "Verified",
    remarks: "Pixel-perfect styling verified.",
    tasks: "Implemented responsive dashboard cards, updated attendance badges, adjusted button hover states.",
    challenges: "Responsive breakpoint alignment for 1080p and smaller screens."
  },
  {
    id: 105,
    type: "Daily Report",
    fileName: "Daily_Accomplishment_Report_Oct19.pdf",
    title: "API Client Integration & Form Validation",
    date: "2026-10-19",
    status: "Verified",
    remarks: "Well structured error handling.",
    tasks: "Wrote unit tests for form input sanitization and mock endpoints.",
    challenges: "Handling network timeout exceptions gracefully."
  },
  {
    id: 106,
    type: "Document",
    fileName: "Parent_Consent_Waiver.pdf",
    date: "2026-10-20",
    status: "Verified",
    remarks: "Notarized copy confirmed.",
    comment: "Signed by parents with attached valid IDs."
  },
  {
    id: 107,
    type: "Daily Report",
    fileName: "Daily_Accomplishment_Report_Oct21.pdf",
    title: "DTR Attendance History & Filters",
    date: "2026-10-21",
    status: "Verified",
    remarks: "Good work on monthly pagination.",
    tasks: "Integrated attendance table pagination, date range filtering, and overtime computation.",
    challenges: "Syncing status tags between summary cards and table rows."
  },
  {
    id: 108,
    type: "Document",
    fileName: "Midterm_Evaluation_Form.pdf",
    date: "2026-10-22",
    status: "Pending",
    remarks: "Awaiting Supervisor Signature",
    comment: "Filled up midterm self-evaluation criteria."
  },
  {
    id: 109,
    type: "Daily Report",
    fileName: "Daily_Accomplishment_Report_Oct23.pdf",
    title: "Dark Theme Color Harmonization",
    date: "2026-10-23",
    status: "Pending",
    remarks: "Pending review by UI Lead",
    tasks: "Adjusted dashboard cards and navigation palette to match Figma dark theme specs.",
    challenges: "Refining contrast ratios for WCAG compliance."
  },
  {
    id: 110,
    type: "Document",
    fileName: "Certificate_of_Registration_COR.pdf",
    date: "2026-10-24",
    status: "Pending",
    remarks: "Under review",
    comment: "Current semester enrollment validation."
  },
  {
    id: 111,
    type: "Document",
    fileName: "Draft_Project_Proposal_v1.pdf",
    date: "2026-10-25",
    status: "Rejected",
    remarks: "Please update project scope section 3 according to supervisor feedback",
    comment: "Initial proposal submission."
  }
];

export function DocumentsProvider({ children }) {
  const [documents, setDocuments] = useState(() => {
    const stored = localStorage.getItem("documents");
    if (!stored) {
      localStorage.setItem("documents", JSON.stringify(SEED_DOCUMENTS));
      return SEED_DOCUMENTS;
    }
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      localStorage.setItem("documents", JSON.stringify(SEED_DOCUMENTS));
      return SEED_DOCUMENTS;
    } catch {
      localStorage.setItem("documents", JSON.stringify(SEED_DOCUMENTS));
      return SEED_DOCUMENTS;
    }
  });

  const updateDocuments = (newDocsOrFn) => {
    setDocuments(prev => {
      const updated = typeof newDocsOrFn === "function" ? newDocsOrFn(prev) : newDocsOrFn;
      localStorage.setItem("documents", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <DocumentsContext.Provider value={{ documents, setDocuments: updateDocuments }}>
      {children}
    </DocumentsContext.Provider>
  );
}

export const useDocuments = () => useContext(DocumentsContext);
