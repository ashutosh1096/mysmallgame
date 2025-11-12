import type { Cell } from '../types';
import { BOARD_SCALESIZE } from '../Enum';

export function useGenerateBoard() {
  function generateBoard(scale: number): Cell[][] {
    const board: Cell[][] = Array(BOARD_SCALESIZE.BOARD_SIZE).fill(null).map(() => Array(BOARD_SCALESIZE.BOARD_SIZE).fill(null).map(() => ({ diamond: false, bomb: false, revealed: false, selected: false })));
    let diamondsPlaced = 0;
    while (diamondsPlaced < scale) {
      const row = Math.floor(Math.random() * BOARD_SCALESIZE.BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SCALESIZE.BOARD_SIZE);
      if (!board[row][col].diamond) {
        board[row][col].diamond = true;
        diamondsPlaced++;
      }
    }
    for (let row = 0; row < BOARD_SCALESIZE.BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SCALESIZE.BOARD_SIZE; col++) {
        if (!board[row][col].diamond) {
          board[row][col].bomb = true;
        }
      }
    }
    return board;
  }
  return {
    generateBoard
  };
}
