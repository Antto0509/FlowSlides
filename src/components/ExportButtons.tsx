"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { SocialNetwork } from "@/types/carousel";

export type ExportFormat = "pdf" | "png";

interface ExportButtonsProps {
  networks: SocialNetwork[];
  isExporting: ExportFormat | false;
  onExport: (format: ExportFormat) => void;
}

export function ExportButtons({
  networks,
  isExporting,
  onExport,
}: ExportButtonsProps) {
  const hasLinkedIn = networks.includes("linkedin");
  const hasInstagram = networks.includes("instagram");
  const isBoth = hasLinkedIn && hasInstagram;

  const ExportIcon = ({ format }: { format: ExportFormat }) =>
    isExporting === format ? (
      <Loader2 className="w-4 h-4 animate-spin" />
    ) : (
      <Download className="w-4 h-4" />
    );

  if (isBoth) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => onExport("pdf")}
          disabled={!!isExporting}
          className="gap-2"
        >
          <ExportIcon format="pdf" />
          LinkedIn (PDF)
        </Button>

        <Button
          className="gap-2 gradient-primary border-0"
          onClick={() => onExport("png")}
          disabled={!!isExporting}
        >
          <ExportIcon format="png" />
          Instagram (PNG)
        </Button>
      </>
    );
  }

  const format: ExportFormat = hasLinkedIn ? "pdf" : "png";
  const label = hasLinkedIn ? "Exporter PDF" : "Exporter PNG";

  return (
    <Button
      className="gap-2 gradient-primary border-0"
      onClick={() => onExport(format)}
      disabled={!!isExporting}
    >
      <ExportIcon format={format} />
      {isExporting ? "Export en cours..." : label}
    </Button>
  );
}