import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import type { GameState } from './types';
import { BOARD_SCALESIZE } from './Enum';
import { useGenerateBoard } from './hooks/useGenerateBoard';



const App: React.FC = () => {
  const { generateBoard } = useGenerateBoard();

  const initialState: GameState & { activeTab: 'manual' | 'auto' } = {
    scale: 1,
    board: generateBoard(1),
    selectedCount: 0,
    popup: null,
    pendingScale: 1,
    activeTab: 'manual',
  };

  const [gameState, setGameState] = useState(initialState);

  const handleCellClick = (row: number, col: number): void => {
    const { board, selectedCount, popup } = gameState;
    if (popup || board[row][col].revealed || selectedCount >= BOARD_SCALESIZE.MAX_SELECTABLE) return;
    const newBoard = board.map(rowArr => rowArr.map(cell => ({ ...cell })));
    newBoard[row][col].revealed = true;
    newBoard[row][col].selected = true;
    const updatedCount = selectedCount + 1;
    let popupMessage: string | null = null;
    if (newBoard[row][col].diamond) {
      popupMessage = 'You Win';
    } else if (newBoard[row][col].bomb) {
      popupMessage = 'You Lost';
    }
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      selectedCount: updatedCount,
      popup: popupMessage,
    }));
  };

  const handleSliderChange = (value: number): void => {
    setGameState(prev => ({
      ...prev,
      pendingScale: value,
    }));
  };

  const handleBet = (): void => {
    setGameState(prev => ({
      ...prev,
      scale: prev.pendingScale,
      board: generateBoard(prev.pendingScale),
      selectedCount: 0,
      popup: null,
    }));
  };

  const handleReset = (): void => {
    if (gameState.popup === 'You Lost') {
      setGameState(prev => ({
        ...prev,
        scale: 1,
        board: generateBoard(1),
        selectedCount: 0,
        popup: null,
        pendingScale: 1,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        board: generateBoard(prev.scale),
        selectedCount: 0,
        popup: null,
      }));
    }
  };

  const { board, popup } = gameState;

  return (
    <div className="game-container">
      <div className="game-layout">
        <div className="control-panel">
          <div className="panel-header">
            <button className={`tab${gameState.activeTab === 'manual' ? ' active' : ''}`}
              onClick={() => setGameState(prev => ({ ...prev, activeTab: 'manual' }))}
            >
              Manual
            </button>
            <button className={`tab${gameState.activeTab === 'auto' ? ' active' : ''}`}
              onClick={() => setGameState(prev => ({ ...prev, activeTab: 'auto' }))}
            >
              Auto
            </button>
          </div>

          {gameState.activeTab === 'manual' ? (
            <>
              <div>
                <label className="label">Amount</label>
                <div className="amount-input inputBox" style={{ height: '32px' }}>
                  <input
                    type="inputNumber"
                    min={1}
                    defaultValue={0.01}
                    className="h-8 text-sm px-2"
                    style={{ height: '32px', fontSize: '0.85rem', padding: '0 10px' }}
                  />
                  <div className="flexD" style={{ height: '32px' }}>
                    <span className="inputNumber h-8 text-sm px-2 flex items-center justify-center" style={{ height: '32px', fontSize: '0.85rem', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1/2</span>
                    <span className="inputNumber h-8 text-sm px-2 flex items-center justify-center" style={{ height: '32px', fontSize: '0.85rem', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2x</span>
                    <button className="h-8 w-8 rounded-md flex flex-col items-center justify-center"
                      type="button" style={{ minWidth: '32px', minHeight: '32px', padding: 0 }}>
                      <div className="flex flex-col items-center justify-center" style={{ height: '32px', width: '32px', background: '#1a1a1a', borderRadius: '8px' }}>
                        <svg viewBox="0 0 32 32" width="12" height="12" fill="none" className="w-3 h-3 rotate-90">
                          <path fill="#fff" d="M19.691 5.6 9.291 16l10.4 10.4 3.018-3.017L15.326 16l7.383-7.382z"></path>
                        </svg>
                        <svg viewBox="0 0 32 32" width="12" height="12" fill="none" className="w-3 h-3 -rotate-90">
                          <path fill="#fff" d="M19.691 5.6 9.291 16l10.4 10.4 3.018-3.017L15.326 16l7.383-7.382z"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="amount-row">
                  <input className="amount-input amount-input-small" type="number" value="10" disabled />
                  <input className="amount-input amount-input-small" type="number" value="100" disabled />
                  <input className="amount-input amount-input-small" type="text" value="1.0k" disabled />
                  <input className="amount-input amount-input-small" type="text" value="10.0k" disabled />
                </div>
              </div>
              <div>
                <label className="label">Mines</label>
                <label className="scale-slider-label">{gameState.pendingScale}</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min={1}
                    max={24}
                    step={1}
                    value={gameState.pendingScale}
                    onChange={e => handleSliderChange(parseInt(e.target.value, 10))}
                    className="slider"
                    aria-valuenow={gameState.pendingScale}
                    aria-valuemin={1}
                    aria-valuemax={24}
                    aria-label="Diamonds scale"
                  />
                  <label>24</label>
                </div>
              </div>
              <button className="bet-button" onClick={handleBet}>Bet</button>
            </>
          ) : (
            <>
              <div>
                <label className="label">Amount</label>
                <div className="amount-input inputBox" style={{ height: '32px' }}>
                  <input
                    type="inputNumber"
                    min={1}
                    defaultValue={100}
                    className="h-8 text-sm px-2"
                    style={{ height: '32px', fontSize: '0.85rem', padding: '0 10px' }}
                  />
                  <div className="flexD" style={{ height: '32px' }}>
                    <span className="inputNumber h-8 text-sm px-2 flex items-center justify-center" style={{ height: '32px', fontSize: '0.85rem', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1/2</span>
                    <span className="inputNumber h-8 text-sm px-2 flex items-center justify-center" style={{ height: '32px', fontSize: '0.85rem', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2x</span>
                    <button className="h-8 w-8 rounded-md flex flex-col items-center justify-center"
                      type="button" style={{ minWidth: '32px', minHeight: '32px', padding: 0 }}>
                      <div className="flex flex-col items-center justify-center" style={{ height: '32px', width: '32px', background: '#1a1a1a', borderRadius: '8px' }}>
                        <svg viewBox="0 0 32 32" width="12" height="12" fill="none" className="w-3 h-3 rotate-90">
                          <path fill="#fff" d="M19.691 5.6 9.291 16l10.4 10.4 3.018-3.017L15.326 16l7.383-7.382z"></path>
                        </svg>
                        <svg viewBox="0 0 32 32" width="12" height="12" fill="none" className="w-3 h-3 -rotate-90">
                          <path fill="#fff" d="M19.691 5.6 9.291 16l10.4 10.4 3.018-3.017L15.326 16l7.383-7.382z"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="amount-row">
                  <input className="amount-input amount-input-small" type="number" value="10" disabled />
                  <input className="amount-input amount-input-small" type="number" value="100" disabled />
                  <input className="amount-input amount-input-small" type="text" value="1.0k" disabled />
                  <input className="amount-input amount-input-small" type="text" value="10.0k" disabled />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="board-area">
          <Board
            board={board}
            gameOver={!!popup}
            onCellClick={handleCellClick}
          />
          {popup && (
            <div className="popup">
              <div className="popup-content">
                <h3>{popup}</h3>
                <button onClick={handleReset}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
