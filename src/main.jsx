// src/main.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Theme } from "@carbon/react";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Risks from "./pages/Risks.jsx";

import "./styles/index.scss";

function Main() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "g10");
  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  return (
    <Theme theme={theme}>
      <BrowserRouter basename="/risk-management">
        {/* Pass theme down so App (HeaderBar) can toggle */}
        <App theme={theme} setTheme={setTheme}>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<Home />} />

            {/* Other pages */}
            <Route path="/risks" element={<Risks />} />
            <Route path="/about" element={<div>About page</div>} />

            {/* Catch-all: redirect back to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </App>
      </BrowserRouter>
    </Theme>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
