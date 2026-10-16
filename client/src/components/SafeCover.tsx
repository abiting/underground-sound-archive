import { useState } from "react";
import { Disc3 } from "lucide-react";

export default function SafeCover({
  src,
  alt,
  lazy = false,
}: {
  src: string;
  alt: string;
  lazy?: boolean;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (!src || failedSource === src) {
    return (
      <div className="missing-cover" role="img" aria-label={`${alt}（封面暫時無法載入）`}>
        <Disc3 size={32} strokeWidth={1.3} />
        <span>封面暫時無法載入</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading={lazy ? "lazy" : "eager"} onError={() => setFailedSource(src)} />;
}
