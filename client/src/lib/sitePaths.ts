export function normalizeBasePath(value = "/"): string {
  if (!value || value === "/") return "";
  if (!value.startsWith("/") || value.startsWith("//") || /[?#\\\s]/.test(value) || value.split("/").some(part => part === "." || part === "..")) {
    throw new Error("網站目錄必須是以 / 開頭的有效路徑。");
  }
  return value.replace(/\/+$/, "");
}

export function withBasePath(route: string, base = ""): string {
  const prefix = normalizeBasePath(base);
  if (!route.startsWith("/") || route.startsWith("//")) return route;
  return `${prefix}${route}`;
}

export function buildBasePath(): string {
  return normalizeBasePath(import.meta.env?.BASE_URL || "/");
}
