// Selectors

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

// Variables

let lastHole;
let timeUp = false;
let score = 0;

// Random Time

function randomTime(min,max){
    return Math.round(Math.random()*(max-min)+min);
}

// Random Hole

function randomHole(holes){
    const idx = Math.floor(Math.random()*holes.length);
    const hole = holes[idx];
    if(hole === lastHole){
        console.log('thats the same hole');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Peep

function peep(){
    const time = randomTime(500,1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}

// Start Game

function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000)
    document.getElementById("btn").disabled = true;
}

// Bonk

function bonk(e){
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));