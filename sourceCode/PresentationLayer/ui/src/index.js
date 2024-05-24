import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import AuthProvider from "./pages/common/context/AuthProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
