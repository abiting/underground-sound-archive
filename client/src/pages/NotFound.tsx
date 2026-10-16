import { ArrowUpRight, Disc3 } from "lucide-react";
import { Link } from "wouter";
import SiteLayout from "../components/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="not-found-page">
        <Disc3 size={40} strokeWidth={1.4} />
        <span className="section-kicker">404 / NO SIGNAL</span>
        <h1>這一頁還沒印出來</h1>
        <p>頁面可能已移動，或網址有誤。回到唱片架，再翻一張。</p>
        <Link href="/">回到場刊首頁 <ArrowUpRight size={15} /></Link>
      </div>
    </SiteLayout>
  );
}
