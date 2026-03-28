import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  
  const [sessions, setSessions] = useState([]); 
  
  
  const [activeSession, setActiveSession] = useState(null); 

  return (
    <SessionContext.Provider value={{ sessions, setSessions, activeSession, setActiveSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}