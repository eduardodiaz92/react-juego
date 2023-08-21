import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  // se regresa la tabla con el valor inicial
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
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
      confetti();
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

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
