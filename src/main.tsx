import "./index.css";
import App from "./App.tsx";
import "antd/dist/reset.css";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
