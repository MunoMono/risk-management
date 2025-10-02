import React from "react";
import HeaderBar from "./components/HeaderBar";

export default function App({ theme, setTheme, children }) {
  return (
    <>
      <HeaderBar theme={theme} toggleTheme={() => setTheme(theme === "g10" ? "g90" : "g10")} />
      <main className="page-container">{children}</main>
    </>
  );
}
