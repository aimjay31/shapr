import { createContext, useContext, useState } from "react";

export const NightModeContext = createContext();

export function NightModeProvider({ children }) {
  const [nightMode, setNightMode] = useState(false);
  const toggleNightMode = () => setNightMode(prev => !prev);

  return (
    <NightModeContext.Provider value={{ nightMode, toggleNightMode }}>
      {children}
    </NightModeContext.Provider>
  );
}

export function useNightMode() {
  return useContext(NightModeContext);
}