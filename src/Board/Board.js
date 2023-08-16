import { useEffect, useState } from "react";
import Square from "./Square";
import "./Board.css";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [score, setScore] = useState({ xWin: 0, oWin: 0 });

  useEffect(() => {
    calculateWinner(squares);
  }, [squares]);

  useEffect(() => {
    console.log(winner);
    console.log(score);
    if (winner) {
        if (winner === "X") {
          let { xWin } = score;
          xWin = +1;
          setScore({ ...score, xWin });
        } else if (winner === "O") {
          let { oWin } = score;
          oWin = +1;
          setScore({ ...score, oWin });
        }
    }
  }, [winner])

  const handleClick = (square) => {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); // Creates a copy of the squares array!
    if (xNext) {
      nextSquares[square] = "X";
      setXNext(false);
    } else {
      nextSquares[square] = "O";
      setXNext(true);
    }
    return setSquares(nextSquares);
  };

  // Function provided by the React Tic-Tac-Toe tutorial!
  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
        setGameOver(true);
        return squares[a];
      }
    }
    return null;
  };

  const newGame = () => {
    setSquares(Array(9).fill(null));
    setXNext(true);
    setGameOver(false);
    setWinner("");
  };

  return (
    <div className="board">
      <div className="title">
        <h1>Tic</h1>
        <h1>Tac</h1>
        <h1>Toe</h1>
      </div>
      <div className="status">
        <p>
          {winner
            ? `And the winner is... ${winner}!`
            : `Next player: ${xNext ? "X" : "O"}`}
        </p>
      </div>
      <div className="board-inner">
        {
          <div className="score">
            <p>X: {score.xWin}</p>
            <p>O: {score.oWin}</p>
          </div>
        }
        <div className="board-row">
          <Square square={squares[0]} handleClick={() => handleClick(0)} />
          <Square square={squares[1]} handleClick={() => handleClick(1)} />
          <Square square={squares[2]} handleClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square square={squares[3]} handleClick={() => handleClick(3)} />
          <Square square={squares[4]} handleClick={() => handleClick(4)} />
          <Square square={squares[5]} handleClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square square={squares[6]} handleClick={() => handleClick(6)} />
          <Square square={squares[7]} handleClick={() => handleClick(7)} />
          <Square square={squares[8]} handleClick={() => handleClick(8)} />
        </div>
        <div className="new-game-button">
          {gameOver && <button onClick={newGame}>New Game</button>}
        </div>
      </div>
    </div>
  );
}
