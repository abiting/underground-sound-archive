import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("找不到網站掛載容器。");
const application = <Router><App /></Router>;

if (root.hasChildNodes()) {
  hydrateRoot(root, application);
} else {
  createRoot(root).render(application);
}
