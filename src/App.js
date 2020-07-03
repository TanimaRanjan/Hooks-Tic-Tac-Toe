import React, { useEffect, useReducer } from "react";
import "./App.css";

const Square = ({ value, onClick }) => (
  <div className="square" onClick={onClick}>
    <p className="marker">{value}</p>
  </div>
);

const intialState = {
  squares: new Array(9).fill(null),
  xNext: true,
  status: "",
}; 

const useInitialState = (intialState) => {
  const [value, setValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    intialState
  );
  const clearValue = () => setValue(intialState);
  return [value, setValue, clearValue];
};

const GameBoard = () => {
  const [{ squares, xNext, status }, setGame, cleanGame] = useInitialState(intialState);

    const calculateWinner = (sq) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a];
      }
    }
    return null;
  };

  let winner = calculateWinner(squares);

  useEffect(() => {
    if (winner) {
      setGame({"status": `Winner: ${winner}` });
    } else {
      setGame({"status": `Next player: ${xNext ? "X" : "O"}` });
    }
  }, [winner, xNext, setGame]);
  
  const handleClick = (i) => {
    let sqs = squares.slice();
    winner = calculateWinner(sqs);
    if (winner || sqs[i]) return;

    sqs[i] = xNext ? "X" : "O";

    setGame({ "squares": sqs });
    setGame({ "xNext": !xNext });
  };

  return (
    <div className="game-board " winner={winner}>
      <div className="status">{status}</div>
      <div className="board-row">
        {squares.map((value, index) => (
          <Square
            value={value}
            key={index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <button className="clear" onClick={cleanGame}>
        Rest Game
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>TIC TAC TOE</h1>
      </header>
      <GameBoard />
    </div>
  );
}

export default App;
