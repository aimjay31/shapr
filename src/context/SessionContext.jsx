import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [sessions, setSessions] = useState([]);

  return (
    <SessionContext.Provider value={{ sessions, setSessions }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}