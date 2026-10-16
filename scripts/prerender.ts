import fs from "node:fs";
import path from "node:path";
import siteConfig from "../site.config";
import { getPublicPaths, renderSeoDocuments } from "../client/src/seo/metadata";
import { withBasePath } from "../client/src/lib/sitePaths";
import { renderDocument } from "../client/src/seo/renderPage";

const output = path.resolve("dist/public");
const template = fs.readFileSync(path.join(output, "index.html"), "utf8");
const options = {
  basePath: process.env.SITE_BASE_PATH || "/",
  origin: process.env.PUBLIC_SITE_ORIGIN || siteConfig.publicOrigin || undefined,
  socialImage: process.env.PUBLIC_SOCIAL_IMAGE_URL || siteConfig.socialImage || undefined,
};
const routes = getPublicPaths();
const routeManifest: { routes: Array<{ path: string; title: string }> } = { routes: [] };

for (const route of routes) {
  const document = renderDocument(template, route, options);
  if (document.status !== 200) throw new Error(`預先渲染失敗：${route}`);
  const filename = route === "/" ? path.join(output, "index.html") : path.join(output, route, "index.html");
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, document.html);
  if (route !== "/") {
    // 同時提供直接物件與 .html 路徑，兼容不同靜態平台的目錄解析。
    fs.writeFileSync(path.join(output, `${route}.html`), document.html);
  }
  routeManifest.routes.push({ path: withBasePath(route, options.basePath), title: document.metadata.title });
}
const missing = renderDocument(template, "/404", options);
fs.writeFileSync(path.join(output, "404.html"), missing.html);
const docs = renderSeoDocuments(options);
fs.writeFileSync(path.join(output, "robots.txt"), docs.robots);
fs.writeFileSync(path.join(output, "sitemap.xml"), docs.sitemap);
fs.writeFileSync(path.join(output, "sitemap-template.xml"), docs.sitemapTemplate);
fs.writeFileSync(path.join(output, "manus-routes.json"), `${JSON.stringify(routeManifest)}\n`);
fs.writeFileSync(path.join(output, "seo-status.json"), `${JSON.stringify({ siteOriginConfigured: Boolean(options.origin), prerenderedPageCount: routes.length, canonicalEnabled: Boolean(options.origin) })}\n`);
console.log(`[SEO] 預先渲染 ${routes.length} 個頁面與 404 頁；正式網域${options.origin ? "已設定" : "尚未設定（預覽 noindex）"}。`);
