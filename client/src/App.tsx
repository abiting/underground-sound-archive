import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const ArtistPage = lazy(() => import("./pages/ArtistPage"));
const AlbumPage = lazy(() => import("./pages/AlbumPage"));

function Router() {
  return (
    <Suspense fallback={<div className="page-loading">唱片翻面中⋯</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/article/:slug">{(params) => <ArticlePage slug={params.slug} />}</Route>
        <Route path="/artist/:slug">{(params) => <ArtistPage slug={params.slug} />}</Route>
        <Route path="/album/:id">{(params) => <AlbumPage id={params.id} />}</Route>
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
