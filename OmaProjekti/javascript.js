const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
   const WINNING_COMPINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const cellElements = document.querySelectorAll("[data-cell]")
   const board = document.getElementById("board")
  const winningMessegeElement = document.getElementById("winningMessege")
const restartButton = document.getElementById("restartButton")
const winningMessegeTextElement = document.querySelector('[data-winning-messege-text]')
let circleTurn

startGame()
restartButton.addEventListener('click', startGame)
 
function startGame(){
    circleTurn = false
    cellElements.forEach(cell => { //tässä on Arrow function =>
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessegeElement.classList.remove('show')
}

function handleClick(e) {

//tässä funktiossa tehdään seuraavat vaiheet:
 // 1. Trkistetaan paikkamerkki
    // 2. tarkistetaan voitto
    // 3. Tarkistetaan onko tasapeli
    // 4. vaihdetaan pelin vuoro

    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placekMark(cell, currentClass)
    if (checkWin(currentClass)){
        // console.log("winner")
        endGame(false)
    }
        else if (isDraw()){
            endGame(true)
        }else{
    // console.log("clicked")
    swapTurns()
    setBoardHoverClass()
        }

    


}

function endGame(draw){ 
    if (draw){
        winningMessegeTextElement.innerText = 'Tasapeli!'
    }else{
        winningMessegeTextElement.innerText = `${circleTurn ? "O" : "X" } Voitti!`
    }
    winningMessegeElement.classList.add('show')
}

function isDraw() { // Tarkistetaan onko tasapeli function
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placekMark(cell, currentClass) { //Trkistetaan paikkamerkki function
    cell.classList.add(currentClass)
}

function swapTurns() { //vaihdetaan pelin vuoro function
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS)
    } else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){ //tarkistetaan voitto function
    return WINNING_COMPINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}