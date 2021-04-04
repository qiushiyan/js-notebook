import { CellTypes, CellLanguages } from "../cell";

type MoveDirection = "up" | "down";

type InsertDirection = "before" | "after";

export interface MoveCell {
  id: string;
  direction: MoveDirection;
}

export interface DeleteCell {
  id: string;
}

export interface InsertCell {
  id: string;
  type: CellTypes;
  direction: InsertDirection;
}

export interface UpdateCell {
  id: string;
  content: string;
}
