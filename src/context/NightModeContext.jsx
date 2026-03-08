import { createContext, useContext, useState } from "react";

export const NightModeContext = createContext();

export function NightModeProvider({ children }) {
  const [nightMode,  setNightMode]  = useState(false);
  const [themeColor, setThemeColor] = useState("purple");

  const toggleNightMode = () => setNightMode(prev => !prev);

  return (
    <NightModeContext.Provider value={{ nightMode, toggleNightMode, themeColor, setThemeColor }}>
      {children}
    </NightModeContext.Provider>
  );
}

export function useNightMode() {
  return useContext(NightModeContext);
}