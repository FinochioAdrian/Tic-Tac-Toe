
import { useState } from 'react'
import confetti from "canvas-confetti";
import './App.css'
import { Square } from './components/Square';
import { TURNS } from "./constants";
import { checkEndGame, checkWinner } from "./logic/board";
import { WinnerModal } from './components/WinnerModal';


function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  })
  const [winner, setWinner] = useState(()=>{
    const winnerFromStorage = window.localStorage.getItem('winner')
    return winnerFromStorage ? JSON.parse(winnerFromStorage) : null})

  const updateBoard = (index) => {
    //no actulizar la posicion si no es null
    if (board[index] || winner) return
    //actulaizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    // guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner) //ganador
    }
    else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }
    window.localStorage.setItem('winner', JSON.stringify(newWinner))
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='board'>
      <h1 > Tic tac toe </h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>

  )
}

export default App
