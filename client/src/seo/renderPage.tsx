import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "../App";
import { metadataForPath, renderSeoHead, jsonLdText, type SeoOptions } from "./metadata";

export function renderPage(path: string, options: SeoOptions = {}) {
  const metadata = metadataForPath(path, options);
  const body = renderToString(<Router ssrPath={metadata.path}><App /></Router>);
  return { metadata, body };
}

export function renderDocument(template: string, path: string, options: SeoOptions = {}) {
  const { metadata, body } = renderPage(path, options);
  const html = template
    .replace(/<!--site-seo:start-->[\s\S]*?<!--site-seo:end-->/, `<!--site-seo:start-->\n    ${renderSeoHead(metadata)}\n    <!--site-seo:end-->`)
    .replace('<!--site-seo:config-->', `<script id="site-seo-config" type="application/json">${jsonLdText(options)}</script>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return { html, status: metadata.status, metadata };
}
