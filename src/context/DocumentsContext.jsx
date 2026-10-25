import { createContext, useContext, useState } from "react";

const DocumentsContext = createContext();

export function DocumentsProvider({ children }) {

  const [documents, setDocuments] = useState([]);

  return (
    <DocumentsContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocumentsContext.Provider>
  );
}

export const useDocuments = () => useContext(DocumentsContext);
