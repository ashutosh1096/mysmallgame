import React from 'react';
import CellComponent from './Cell';
import type { BoardProps } from '../types';


const Board: React.FC<BoardProps> = ({ board, gameOver, onCellClick }) => {
  return (
    <div className="board">
      {board.map((rowArr, rowIdx) => (
        <div className="board-row" key={rowIdx}>
          {rowArr.map((cell, colIdx) => (
            <CellComponent
              key={colIdx}
              revealed={cell.revealed}
              diamond={cell.diamond}
              bomb={cell.bomb}
              selected={cell.selected}
              onClick={() => onCellClick(rowIdx, colIdx)}
              gameOver={gameOver}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
