// DOM elements
const grid = document.querySelector(".grid")
const startBtn = document.getElementById("start")
const scoreBoard = document.getElementById("score")

// vars
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let width = 10
let time = 600
let timeRise = .05 // in %
let appleIndex = 0
let applePoints = 1
let score = 0

function createGrid() {
    for(let i=0; i<100; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

createGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))
generateApple()

// controls
function move() {
    if (!isGameOver()) {
        const tail = currentSnake.pop(0)
        squares[tail].classList.remove('snake')
        const head = currentSnake.unshift(currentSnake[0] + direction)
        if(squares[currentSnake[0]].classList.contains('apple')) {
            eatApple(tail)
            clearInterval(timerId)
            timerId = setInterval(move, time)
        }
        squares[currentSnake[0]].classList.add('snake')
    } else {
        clearInterval(timerId)
        alert("Game over !")
    }    
}
let timerId = setInterval(move, time)
function control(e) {
    //right
    if (e.keyCode === 39 && direction!==-1) direction = 1
    // left
    else if (e.keyCode === 37&& direction!==1) direction = -1
    // up
    else if (e.keyCode === 38 && direction!==(+width)) direction = -width
    // down
    else if (e.keyCode === 40 && direction!==(-width)) direction = +width
}
document.addEventListener('keydown', control)
// Game rules
function isGameOver() {
    return (currentSnake[0] + direction < 0 ||  
        currentSnake[0] + direction > width*width ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] % width === 9 && direction === 1) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
}
function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
}
function eatApple(tail) {
    squares[appleIndex].classList.remove('apple')
    currentSnake.push(tail)
    squares[tail].classList.add('snake')
    time -= (time*timeRise)
    console.log(`${time} ms.`)
    score += applePoints
    scoreBoard.textContent = score
    generateApple()
}