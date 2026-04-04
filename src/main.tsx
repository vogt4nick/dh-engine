import "./styles/tokens.css";

import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./components/App";

if (import.meta.env.DEV) {
  const axe = await import("@axe-core/react");
  await axe.default(React, ReactDOM, 1000);
}

const rootElement = document.querySelector("#root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
