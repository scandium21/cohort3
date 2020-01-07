import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function PageContent(props) {
  const { darkMode, fontColor } = useContext(ThemeContext);
  const styles = {
    backgroundColor: darkMode ? "#796A82 " : "#FFDFDB",
    color: fontColor,
    height: "100vh",
    width: "100vw"
  };
  return <div style={styles}>{props.children}</div>;
}
