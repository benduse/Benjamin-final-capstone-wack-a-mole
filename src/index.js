const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
const score=document.querySelector('#score'); 
const timerDisplay=document.querySelector('#timer');

const audioHit = new Audio("https://github.com/benduse/Benjamin-final-capstone-wack-a-mole/blob/main/assets/hit.mp3");
const song = new Audio("https://github.com/benduse/Benjamin-final-capstone-wack-a-mole/blob/main/assets/molesong.mp3");

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";


function playAudio(audioObject) {
  audioObject.play();
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
}

function play(){
  playAudio(song);
}

// Generates a random integer within a range.
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//This sets the game difficulty level
function setDelay(difficulty) {
  
  if(difficulty === 'easy'){
  return 1500
  }
  if (difficulty === 'normal'){
    return 1000
  }
  if (difficulty === 'hard') {
    return randomInteger (600,1200)
  }
}

//Chooses a random hole from a list of holes.
function chooseHole(holes) {
  
const index = randomInteger(0,8);
const hole= holes[index];
if(hole === lastHole) {
  return chooseHole(holes)
} else {
  lastHole = hole;
  return hole
}
}

//This code determines if the game should stop or continue depending on cases
function gameOver() {
  if(time > 0){
    timeoutID = showUp()
    return timeoutID
  } 
  
  else{
    let gameStopped = stopGame()
    return gameStopped
  }
}


// Calls the showAndHide function with a specific delay and a hole.
function showUp() {
  let delay = setDelay(difficulty); 
  const hole = chooseHole(holes);  
  return showAndHide(hole, delay);
}

// The purpose of this function is to show and hide the mole given a delay time and the hole where the mole is hidden.

function showAndHide(hole, delay){

  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, 1500); 
  return timeoutID;
}

// Adds or removes show class defined in Css 
function toggleVisibility(hole){
 
  hole.classList.toggle('show');
  return hole;
}

// This function increments the points global variable and updates the scoreboard.
function updateScore() {
  
 points++;
 score.textContent = points; 

  return points;
}

//  This function clears the score by setting points to zero. 
function clearScore() {
  // TODO: Write your code here
  points = 0;
  score.textContent = points;
  return points;
}

//  Updates the control board with the timer if time > 0
function updateTimer() {
  if (time > 0){
    time -=1;
    timerDisplay.textContent = time;
  }
  return time;
}

//  Starts the timer using setInterval. For each 1000ms (1 second)
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

// when a player hits the mole this gets called and play sounds and updates the scores
function whack(event) {
  console.log("wack!")
  updateScore();
  playAudio(audioHit);
  return points;
}

//  Adds the 'click' event listeners to the moles. 
function setEventListeners(){
moles.forEach(
  mole => mole.addEventListener ('click', whack)
);
  return moles;
}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  stopAudio(song); 
  clearInterval(timer);
  return "game stopped";
}

//  This is the function that starts the game when the `startButton` is clicked.
function startGame(){
  loopAudio(song)
  setDuration(timer);
  showUp();
  startTimer();
  clearScore();
  setEventListeners();
  return "game started";
}

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
