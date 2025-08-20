"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Copy } from "lucide-react";
import type { KeywordResultsDialogProps } from "@/features/keyword/lib/types";
import {
  copyKeywordsToClipboard,
  exportKeywordsToCSV,
  getIntentColor,
  getDifficultyColor,
} from "@/features/keyword/lib/utils";

export function KeywordResultsDialog({
  open,
  onOpenChange,
  suggestions,
  siteName,
}: KeywordResultsDialogProps) {
  const handleCopyKeywords = () => {
    copyKeywordsToClipboard(suggestions);
  };

  const handleExportExcel = () => {
    exportKeywordsToCSV(suggestions, siteName);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-7xl max-h-[85vh] h-auto p-0 overflow-hidden">
        <div className="h-full flex flex-col p-4 sm:p-8">
          <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 space-y-0 pb-2">
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-semibold">
                Your Keywords Are Ready! 🎉
              </DialogTitle>
              <p className="text-sm sm:text-base text-muted-foreground">
                SEO‑optimized keywords for {siteName || "your website"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportExcel}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export To Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyKeywords}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Keywords
              </Button>
            </div>
          </DialogHeader>

          <Table className="table-fixed">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-left">Keyword</TableHead>
                <TableHead className="text-right ">Volume</TableHead>
                <TableHead className="text-right ">Difficulty</TableHead>
                <TableHead className="text-right">Intent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suggestions.map((s, idx) => (
                <TableRow key={idx} className="odd:bg-muted/30">
                  <TableCell className="text-left">
                    <div className="w-full">
                      <div className="font-medium break-words max-lg:truncate">
                        {s.keyword}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 break-words max-lg:truncate">
                        {s.titleIdea}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {s.volume.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className={getDifficultyColor(s.difficulty)}
                    >
                      {s.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right w-[20%]">
                    <Badge
                      variant="secondary"
                      className={getIntentColor(s.intent)}
                    >
                      {s.intent}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
