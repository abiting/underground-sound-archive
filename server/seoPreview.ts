import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import siteConfig from "../site.config";
import type { SeoOptions } from "../client/src/seo/metadata";

export function seoPreviewPlugin(projectRoot: string): Plugin {
  return {
    name: "underground-sound-seo-preview",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        const pathname = new URL(req.url || "/", "http://localhost").pathname;
        if (/^\/(api|__manus__|__system__|manus-storage|assets|src|@|node_modules|riffatlas-icon|underground-sound-icon|apple-touch-icon)/.test(pathname)) return next();
        if (pathname !== "/robots.txt" && pathname !== "/sitemap.xml" && /\.[a-z0-9]+$/i.test(pathname)) return next();
        try {
          const options: SeoOptions = {
            origin: process.env.PUBLIC_SITE_ORIGIN || siteConfig.publicOrigin || undefined,
            socialImage: process.env.PUBLIC_SOCIAL_IMAGE_URL || siteConfig.socialImage || undefined,
          };
          if (pathname === "/robots.txt" || pathname === "/sitemap.xml") {
            const { renderSeoDocuments } = await server.ssrLoadModule("/src/seo/metadata.ts");
            const docs = renderSeoDocuments(options);
            res.statusCode = 200;
            res.setHeader("Content-Type", pathname === "/robots.txt" ? "text/plain; charset=utf-8" : "application/xml; charset=utf-8");
            res.setHeader("Cache-Control", "no-store");
            res.end(req.method === "HEAD" ? "" : pathname === "/robots.txt" ? docs.robots : docs.sitemap);
            return;
          }
          const { renderDocument } = await server.ssrLoadModule("/src/seo/renderPage.tsx");
          const template = fs.readFileSync(path.join(projectRoot, "client/index.html"), "utf8");
          const document = renderDocument(template, pathname, options);
          const html = await server.transformIndexHtml(pathname, document.html);
          res.statusCode = document.status;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.end(req.method === "HEAD" ? "" : html);
        } catch (error) {
          server.ssrFixStacktrace(error as Error);
          console.error("[SEO Preview]", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end("頁面暫時無法產生，請稍後再試。");
        }
      });
    },
  };
}
