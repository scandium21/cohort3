import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeSetting = props => {
  const { darkMode, toggleMode, fontColor, setFontColor } = useContext(
    ThemeContext
  );
  const handleToggleMode = e =>
    toggleMode(e.target.value == "darkMode" ? true : false);
  const handleSetFontColor = e => setFontColor(e.target.value);
  return (
    <>
      <div>
        <h2>Display Mode: </h2>
        <label htmlFor="dark-mode">
          <input
            id="dark-mode"
            type="radio"
            value="darkMode"
            checked={darkMode}
            onChange={handleToggleMode}
          />
          Dark Mode
        </label>
        <label htmlFor="light-mode">
          <input
            id="light-mode"
            type="radio"
            value="lightMode"
            checked={!darkMode}
            onChange={handleToggleMode}
          />
          Light Mode
        </label>
      </div>
      <div>
        <h2>Font Color: </h2>
        <select
          value={fontColor}
          onChange={handleSetFontColor}
          style={{ marginBottom: "40px" }}
        >
          <option value="black">Black</option>
          <option value="#6B3EB3">Purple</option>
          <option value="#4BB36F">Green</option>
        </select>
      </div>
    </>
  );
};

export default ThemeSetting;
