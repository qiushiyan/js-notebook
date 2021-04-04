export type CellTypes = "code" | "text";

export type CellLanguages = "js" | "ts";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
  language?: CellLanguages;
}
