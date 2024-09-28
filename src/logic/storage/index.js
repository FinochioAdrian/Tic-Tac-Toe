export const saveGameToStorage = (newBoard,newTurn,newWinner)=>{
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))
    window.localStorage.setItem('winner', JSON.stringify(newWinner))
}

export const resetGameStorage = () =>{
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('winner')
}