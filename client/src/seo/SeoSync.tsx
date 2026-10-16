import { useEffect } from "react";
import { useLocation } from "wouter";
import { metadataForPath, renderSeoHead, type SeoOptions } from "./metadata";

function publicSeoOptions(): SeoOptions {
  try {
    const raw = document.getElementById("site-seo-config")?.textContent;
    return raw ? JSON.parse(raw) as SeoOptions : {};
  } catch {
    return {};
  }
}

export default function SeoSync() {
  const [path] = useLocation();
  useEffect(() => {
    const metadata = metadataForPath(path, publicSeoOptions());
    const template = document.createElement("template");
    template.innerHTML = renderSeoHead(metadata);
    document.head.querySelectorAll("[data-site-seo]").forEach((node) => node.remove());
    document.head.appendChild(template.content);
    document.documentElement.lang = "zh-Hant";
  }, [path]);
  return null;
}
