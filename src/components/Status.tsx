import React from 'react';
import type { StatusProps } from '../types';


const Status: React.FC<StatusProps> = ({ gameOver, win }) => (
  <div className="status">
    {gameOver && <span className="lose">💣 Game Over!</span>}
    {win && <span className="win">🎉 You Win!</span>}
    {!gameOver && !win && <span>Click a cell to reveal. Right-click to flag.</span>}
  </div>
);

export default Status;
