import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = props => {
  const [darkMode, toggleMode] = useState(false);
  const [fontColor, setFontColor] = useState("black");
  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleMode, fontColor, setFontColor }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
