// script.js
// Simple Estonian word learning game
// ----------------------------------

// Cache DOM elements for quick access
const startScreen = document.getElementById('start-screen');
const playBtn     = document.getElementById('play-button');
const gameScreen  = document.getElementById('game-screen');
const endScreen   = document.getElementById('end-screen');
const restartBtn  = document.getElementById('restart-button');
const wordElem    = document.getElementById('word');
const optionsElem = document.getElementById('options');
const feedbackElem= document.getElementById('feedback');
const nextBtn     = document.getElementById('next-button');
const scoreElem   = document.getElementById('score');
const finalScore  = document.getElementById('final-score');
const scoreHeader = document.getElementById('score-header');
const logoBtn     = document.getElementById('logo');
const tomorrowBtn = document.getElementById('tomorrow-button');

let words = [];      // Loaded from words.json
let currentIdx = 0;  // Index of the current word
let score = 0;       // User's score

// Utility — Fisher–Yates shuffle for unbiased random order
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Capitalizes first letter of a string
const capFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

// Simple beep sound using Web Audio API
let audioCtx;
function playBeep() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    osc.start();
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    osc.stop(audioCtx.currentTime + 0.25);
  } catch (e) {
    // ignore if AudioContext fails (e.g., autoplay restrictions)
  }
}

// Event Listeners -----------------------------------------------------------
playBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
if (tomorrowBtn) tomorrowBtn.addEventListener('click', () => {
  // Return to welcome screen, encourage user to come back later
  endScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
});

if (logoBtn) logoBtn.addEventListener('click', () => {
  // Show start screen from anywhere
  gameScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
});
nextBtn.addEventListener('click', () => {
  currentIdx++;
  if (currentIdx < words.length) {
    showWord();
  } else {
    endGame();
  }
});

// Game Flow Functions -------------------------------------------------------
function startGame() {
  fetch('words.json')
    .then(res => res.json())
    .then(data => {
      words = shuffle([...data]); // clone & shuffle list
      currentIdx = 0;
      score = 0;
      startScreen.classList.add('hidden');
      endScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      updateScore();
      showWord();
    })
    .catch(err => {
      console.error('Unable to load words.json', err);
      alert('Viga: ei saa laadida words.json faili');
    });
}

function showWord() {
  const current = words[currentIdx];
  wordElem.textContent = capFirst(current.word);
  feedbackElem.textContent = '';
  nextBtn.classList.add('hidden');

  // Build answer options: correct + 2 random decoys -----------------------
  const definitions = words.map(w => w.definition);
  const decoys = shuffle(definitions.filter(d => d !== current.definition)).slice(0, 2);
  const options = shuffle([current.definition, ...decoys]);

  // Render buttons --------------------------------------------------------
  optionsElem.innerHTML = '';
  options.forEach(def => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = def;
    btn.addEventListener('click', () => selectOption(btn, def === current.definition, current.definition));
    optionsElem.appendChild(btn);
  });
}

function selectOption(button, isCorrect, explanation) {
  // Disable all buttons after a choice
  Array.from(optionsElem.children).forEach(b => (b.disabled = true));

  if (isCorrect) {
    button.classList.add('correct');
    score++;
    updateScore();
    feedbackElem.textContent = 'Õige! ' + explanation;
    playBeep();
    document.body.classList.add('flash');
    setTimeout(() => document.body.classList.remove('flash'), 300);
  } else {
    button.classList.add('incorrect');
    feedbackElem.textContent = 'Vale! Õige vastus: ' + explanation;
  }

  nextBtn.classList.remove('hidden');
}

function updateScore() {
  scoreElem.textContent = `Punktid: ${score} / ${words.length}`;
  if (scoreHeader) {
    scoreHeader.textContent = `${score} / ${words.length}`;
  }
}

function endGame() {
  gameScreen.classList.add('hidden');
  finalScore.textContent = `${score} / ${words.length}`;
  endScreen.classList.remove('hidden');
  // Reset score header for clarity
  if (scoreHeader) scoreHeader.textContent = `${score} / ${words.length}`;
} 