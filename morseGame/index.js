
var MORSE2CHAR = {
    '.-': 'A',
    '-...': 'B',
    '-.-.': 'C',
    '-..': 'D',
    '.': 'E',
    '..-.': 'F',
    '--.': 'G',
    '....': 'H',
    '..': 'I',
    '.---': 'J',
    '-.-': 'K',
    '.-..': 'L',
    '--': 'M',
    '-.': 'N',
    '---': 'O',
    '.--.': 'P',
    '--.-': 'Q',
    '.-.': 'R',
    '...': 'S',
    '-': 'T',
    '..-': 'U',
    '...-': 'V',
    '.--': 'W',
    '-..-': 'X',
    '-.--': 'Y',
    '--..': 'Z',
    '-----': '0',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
}
var CHAR2MORSE = {}

Object.entries(MORSE2CHAR).map(([k, v]) => {
    CHAR2MORSE[v] = k;
});

STR2MORSE = (s) => {
    const res = Array.from(s).map(ch => CHAR2MORSE[ch]);
    return res.join('').replace(/\./gi, '0').replace(/-/gi, '1').match(/.{1,4}/g).map(x => parseInt(x, 2)).join('')
}


var arr = new Uint32Array(1)

function randInt(min, max) {
    return min + self.crypto.getRandomValues(arr)[0]%(max-min+1)
}

function newChallenge() {
    document.getElementById('elapsed').innerHTML = Date.now()-now + 'ms'
    document.getElementById('last').innerHTML = currentChallenge + ' = ' + currentMorse
    currentChallenge = String.fromCharCode(65 + randInt(0, 25))
    challengeElement.innerHTML = currentChallenge
    currentMorse = CHAR2MORSE[currentChallenge]
    now = Date.now()
}

challengeElement = document.querySelector('#game > div')
var currentChallenge = ''
var currentMorse = ''
var now = Date.now();
newChallenge()


const input = document.querySelector('#game > input')
input.addEventListener('keyup', (ev) => {
    if (ev.keyCode === 37) input.value += '.'
    else if (ev.keyCode === 39) input.value += '-'
    else if (ev.keyCode === 40) input.value += '.'
    else if (ev.keyCode === 38) input.value += '-'
    
    if (input.value === currentMorse) {
        input.value = ''
        newChallenge()
    }
})