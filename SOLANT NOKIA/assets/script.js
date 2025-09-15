const buttons = {
  '1': ['1'],
  '2': ['A', 'B', 'C'],
  '3': ['D', 'E', 'F'],
  '4': ['G', 'H', 'I'],
  '5': ['J', 'K', 'L'],
  '6': ['M', 'N', 'O'],
  '7': ['P', 'Q', 'R', 'S'],
  '8': ['T', 'U', 'V'],
  '9': ['W', 'X', 'Y', 'Z'],
  '0': ['0 ']
};

let lastKey = null;
let pressCount = 0;
let timeout;
let output = '';

const outputText = document.getElementById('output-text');
const keys = document.querySelectorAll('.key');
const deleteBtn = document.getElementById('delete');
const tvContent = document.getElementById('tv-content'); // Televisión

keys.forEach(key => {
  key.addEventListener('click', () => {
    const keyValue = key.dataset.key;

    if (keyValue === lastKey) {
      pressCount++;
    } else {
      confirmLetter();
      lastKey = keyValue;
      pressCount = 1;
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      confirmLetter();
      lastKey = null;
      pressCount = 0;
    }, 1000); // tiempo para confirmar la letra elegida, aca tipo A o B o C

    const letters = buttons[keyValue];
    if (letters) {
      const currentChar = letters[(pressCount - 1) % letters.length];
      outputText.textContent = output + currentChar;
    }
  });
});

deleteBtn.addEventListener('click', () => {
  output = output.slice(0, -1);
  outputText.textContent = output;
  updateTV(output); // actualiza la tv al borrarla oullea
  lastKey = null;
  pressCount = 0;
  clearTimeout(timeout);
});

function confirmLetter() {
  if (lastKey && buttons[lastKey]) {
    const letters = buttons[lastKey];
    const confirmedChar = letters[(pressCount - 1) % letters.length];
    output += confirmedChar;
    outputText.textContent = output;
    updateTV(output); // actualiza la TV al confirmar letra
  }
}

const computerTrigger = document.getElementById('computer-trigger');
const computerSound = new Audio('images/windows-xp-startup_1ph012n.mp3'); 

computerTrigger.addEventListener('click', () => {
  computerSound.currentTime = 0;
  computerSound.play();
});

function updateTV(text) {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('narison')) {
    tvContent.src = 'images/narison.png';
  } else if (lowerText.includes('niggrs')) {
    tvContent.src = 'assets/images/ollea.gif';
  } else if (lowerText.includes('reyrey')) {
    tvContent.src = 'assets/images/glitch.gif';
  } else {
    tvContent.src = 'images/Television_static.gif'; // pantalla vacía, solo el gif duhhh
  }
}

