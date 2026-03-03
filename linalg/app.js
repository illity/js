

const matrixElement = document.getElementById('matrix');
const app = document.getElementById('root')
const numpad = document.getElementById('numpad')
const display = document.getElementById('display')
const menu = document.getElementById('menu')


const winElement = document.createElement('div')
winElement.id = 'result'
var lastTime; 


function result(win) {
  if (win) {
    winElement.className = 'absolute top-1/3 left-1/2 -translate-x-1/2 bg-green-400 p-6 text-black text-center'
    winElement.innerHTML = `Você acertou!\n:)\n\n${(new Date() - lastTime)/1000}s`
  } else {
    winElement.className = 'absolute top-1/3 left-1/2 -translate-x-1/2 bg-red-400 p-6 text-black text-center'
    winElement.innerHTML = 'Você errou!\n):'
  }
}


var matrix;
var det = 710;
var [min, max] = [1, 20]
var config = {
  'min': 1,
  'max': 20,
  'sz': 2,
  'allowRepeat': false
}
var current = 710
var sign = false
let sz = 2;
var allowRepeat = false

function input(obj, key) {
  const el = document.createElement('div')
  const label = document.createElement('div')
  label.innerHTML = key
  el.appendChild(label)
  const inp = document.createElement('div')
  inp.className = 'flex justify-center gap-2 text-2xl'
  const minusButton = document.createElement('button')
  minusButton.innerHTML = '-'
  const plusButton = document.createElement('button')
  plusButton.innerHTML = '+'
  const value = document.createElement('span')
  value.innerHTML = obj[key]
  inp.appendChild(minusButton)
  inp.appendChild(value)
  inp.appendChild(plusButton)
  el.appendChild(inp)
  minusButton.addEventListener("click",(ev)=>{
    obj[key] -= 1
    value.innerHTML = obj[key]
  })
  plusButton.addEventListener("click",(ev)=>{
    obj[key] += 1
    value.innerHTML = obj[key]
  })
  return el
}

function settings() {
  document.body.removeChild(app)
  const app2 = document.createElement('div')
  app2.appendChild(input(config, 'min'))
  app2.appendChild(input(config, 'max'))
  app2.appendChild(input(config, 'sz'))
  app2.appendChild(input(config, 'allowRepeat'))
  const done = document.createElement('button')
  done.innerHTML = 'done'
  app2.appendChild(done)
  document.body.appendChild(app2)
  done.addEventListener('click', (ev) => {
    document.body.removeChild(app2)
    min = config['min']
    max = config['max']
    sz = config['sz']
    allowRepeat = config['allowRepeat']
    document.body.appendChild(app)
  })
}


function newMatrix() {
  if (!allowRepeat && sz*sz > max-min) return
  matrix = Array.from(Array(sz), () => new Array(sz))
  current = 0;
  sign = false;
  display.innerHTML = 0;
  used = []
  for (let i = 0; i < sz; i++) {
    for (let j = 0; j < sz; j++) {
      matrix[i][j] = Math.floor(Math.random() * (max - min + 1) + min);
      while (!allowRepeat && used.includes(matrix[i][j])) {
        matrix[i][j] = Math.floor(Math.random() * (max - min + 1) + min);
      }
      used.push(matrix[i][j])
      console.log(used)      
    }
  }
  var u = Array.from(Array(sz), () => new Array(3)) 
  for (let i = 0; i < sz; i++) {
    for (let j = 0; j < sz; j++) {
      u[i][j] = matrix[i][j]
    }
  }
  for (let i = 0; i < sz; i++) {
    for (let j = 0; j < sz; j++) {
      if (i==j) continue;
      c = u[j][i]/u[i][i]
      for (let k = 0; k < sz; k++) {
        u[j][k] = u[j][k] - c * u[i][k]
      }
    }
  }
  let product = 1
  for (let i = 0; i < sz; i++) {
    product *= u[i][i];
  }
  det = product

  matrixElement.className = matrixElement.className.replace(/grid-cols-\d/, `grid-cols-${sz}`)
  while (matrixElement.firstChild) {
    matrixElement.removeChild(matrixElement.lastChild);
  }
  for (let i=0; i<sz*sz; i++) {
    const el = document.createElement('div')
    el.innerHTML = matrix[~~(i/sz)][i%sz];
    matrixElement.appendChild(el)
  }
  lastTime = new Date();
}


numpad.addEventListener("click", (ev) => {
  const botao = ev.target.innerHTML;
  if (!isNaN(botao)) {
    current = 10*current + 1*botao;
  }
  else if (botao === 'back') {
    current = ~~(current/10);
  }
  else if (botao === '-') {
    sign = !sign;
  }
  else if (botao === 'new') {
    newMatrix();
  }
  display.innerHTML = current * (sign?-1:1)
  if (Math.abs(current * (sign?-1:1) - det) < 1) {
    result(true)
    document.body.appendChild(winElement)
    setTimeout(() => {
      document.body.removeChild(winElement);
      newMatrix();
    }, 1500);
  }
})

const dict = {
          'newMatrix': newMatrix,
          'settings': settings
}
        for (let child of menu.children) {
          child.addEventListener('click', (ev) => {
            dict[child.name]()
          })
        }
