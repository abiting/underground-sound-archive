import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";
import NotFound from "./pages/NotFound";
import SeoSync from "./seo/SeoSync";
import { metadataForPath } from "./seo/metadata";

function PageRouter() {
  const [path] = useLocation();
  const metadata = metadataForPath(path);
  if (metadata.kind === "home") return <Home />;
  if (metadata.kind === "article") return <ArticlePage slug={metadata.path.slice("/article/".length)} />;
  if (metadata.kind === "artist") return <ArtistPage slug={metadata.path.slice("/artist/".length)} />;
  if (metadata.kind === "album") return <AlbumPage id={metadata.path.slice("/album/".length)} />;
  return <NotFound />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <SeoSync />
          <PageRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
