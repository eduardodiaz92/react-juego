import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [3, 4, 5],
  [6, 7, 8],
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X o U ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    // si no hay ganador
    return null;
  };
  // se regresa la tabla con el valor inicial
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay más espacios vacíios
    // en el tablero
    // si todas las posicones (square) del array newBoard tienen que el square es
    // diferente a null hay empate
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    /* no actaulizamos esta posicions
  si ya tiene algo */
    if (board[index] || winner) return;
    // actualizar el tablero, la copia del board se hace porque no tienes que mutar nunca
    // las props ni el estado. tienen que ser inmutables
    const newBoard = [...board];
    // el nuevo board como recive el indice, le daremos el valor del turno actual
    newBoard[index] = turn;
    // para actualizar el tablero usamos el setBoard con el nuevo board
    setBoard(newBoard);
    // cambiar elturno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    // es importante que los datos de renderizado siempre sean nuevos
    setTurn(newTurn);
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      // la actualizacion de los estado en react son asincronos, no bloquea
      // la ejecucion del codigo que viene despues
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
    }
  };

  return (
    <main className="board">
      <h1>Gato</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Ganó:"}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
