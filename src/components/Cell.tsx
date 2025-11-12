import React from 'react';
import type { CellProps } from '../types';


const Cell: React.FC<CellProps> = ({ revealed, diamond, bomb, selected, onClick }) => {
  let cellContent: string = '';
  let cellClass = 'cell';
  if (revealed) {
    if (diamond) {
      cellContent = '💎';
    } else if (bomb) {
      cellContent = '💣';
      cellClass += ' mine';
    }
    cellClass += ' revealed';
  }
  if (selected) {
    cellClass += ' selected';
  }
  return (
    <div
      className={cellClass}
      data-diamond={revealed && diamond ? 'true' : undefined}
      onClick={onClick}
    >
      {cellContent}
    </div>
  );
};

export default Cell;
