import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProviderWrapper } from "./context/auth.context.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProviderWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProviderWrapper>
);
