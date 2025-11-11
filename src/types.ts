export interface GameState {
  scale: number;
  pendingScale: number;
  board: Cell[][];
  selectedCount: number;
  popup: string | null;
}


export interface BoardProps {
  board: Cell[][];
  gameOver: boolean;
  onCellClick: (row: number, col: number) => void;
}

export type CellProps = {
  revealed: boolean;
  diamond: boolean;
  bomb: boolean;
  selected: boolean;
  onClick: () => void;
  gameOver: boolean;
};


export type Cell = {
  diamond: boolean;
  bomb: boolean;
  revealed: boolean;
  selected: boolean;
};

export type StatusProps = {
  gameOver: boolean;
  win: boolean;
};

