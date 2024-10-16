const emojis = [
  '👽','🕹️','💀','❤️','👁️','⚔️','❤️','⭐',
  '🤬','👽','⚔️','🤬','🕹️','👁️','💀','⭐'
];

let openCards = [];

function shuffleArray(array) {
  return array.sort(() => (Math.random() - 0.5) * 3);
}

function createGameBoard(shuffledEmojis) {
  const gameContainer = document.querySelector('.game');
  shuffledEmojis.forEach(emoji => {
    const box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = `
      <div class="front">${emoji}</div>
      <div class="back"></div>`;
    box.onclick = handleClick;
    gameContainer.appendChild(box);
  });
}

function handleClick() {
  if (openCards.length < 2 && !this.classList.contains('boxOpen')) {
    this.classList.add('boxOpen');
    playSound('openCard');
    openCards.push(this);

    if (openCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [firstCard, secondCard] = openCards;
  const isMatch = firstCard.innerHTML === secondCard.innerHTML;

  if (isMatch) {
    firstCard.classList.add('boxMatch');
    secondCard.classList.add('boxMatch');
    playSound('match');
  } else {
    firstCard.classList.remove('boxOpen');
    secondCard.classList.remove('boxOpen');
    playSound('hideCard');
  }

  openCards = [];

  if (document.querySelectorAll('.boxMatch').length === emojis.length) {
    endGame();
  }
}

function endGame() {
  createConfetti();
  setTimeout(() => playSound('victory'), 500);
  setTimeout(() => {
    document.querySelector('.winBox').style.display = 'block';
  }, 5000);
}

function playSound(audioName) {
  const audio = new Audio(`./src/sounds/${audioName}.mp3`);
  audio.volume = 0.9;
  audio.play();
}

function createConfetti() {
  const confettiCount = 200;
  const container = document.body;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    container.appendChild(confetti);

    confetti.addEventListener('animationend', () => confetti.remove());
  }
}

// Inicialização do jogo
const shuffledEmojis = shuffleArray([...emojis]);
createGameBoard(shuffledEmojis);