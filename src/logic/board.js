import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
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

  export const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay más espacios vacíios
    // en el tablero
    // si todas las posicones (square) del array newBoard tienen que el square es
    // diferente a null hay empate
    return newBoard.every((square) => square !== null);
  };