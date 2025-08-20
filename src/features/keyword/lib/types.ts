export type Suggestion = {
  keyword: string;
  intent: string;
  titleIdea: string;
  difficulty: number;
  volume: number;
};

export type KeywordData = {
  suggestions: Suggestion[];
};

export interface KeywordResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestions: Suggestion[];
  siteName?: string;
}
