import { CellTypes, CellLanguages } from "../cell";

type MoveDirection = "up" | "down";

export interface MoveCell {
  id: string;
  direction: MoveDirection;
}

export interface DeleteCell {
  id: string;
}

export interface InsertCell {
  id: string | null;
  type: CellTypes;
}

export interface UpdateCell {
  id: string;
  content: string;
}

export interface BundlerInput {
  id: string;
  input: string;
}

export interface BundlerOutput {
  code: string;
  error: string;
}
