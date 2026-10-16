import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath, { index: false, redirect: false }));

  // Every public route has its own prerendered HTML; never turn misses into a soft 404.
  app.use("*", (req, res) => {
    const pathname = new URL(req.originalUrl, "http://localhost").pathname.replace(/\/+$/, "") || "/";
    const filename = pathname === "/"
      ? path.resolve(distPath, "index.html")
      : path.resolve(distPath, `.${pathname}`, "index.html");
    if (filename.startsWith(`${path.resolve(distPath)}${path.sep}`) && fs.existsSync(filename) && fs.statSync(filename).isFile()) {
      res.sendFile(filename);
      return;
    }
    const missing = path.resolve(distPath, "404.html");
    if (fs.existsSync(missing)) {
      res.status(404).sendFile(missing);
    } else {
      res.status(404).type("text/plain").send("找不到頁面。");
    }
  });
}
