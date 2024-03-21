const nota = document.getElementById('nota')
const pontos = document.getElementById('pontos')
function computarNota(form) {
    var total = 0
    var divisor = 0
    form = form.querySelectorAll('input')
    for (let i=0; i<5; i++) {
        total += (i+1)*(5-i)*form[i].value
        divisor += (i+1)*form[i].value
    }
    total += (1)*(5-0)*form[5].value
    divisor -= -form[5].value
    for (let i=5; i<10; i++) {
        const j = i-5
        total += (j+1)*(5-j)*form[i].value
        divisor += (j+1)*form[i].value
    }
    nota.innerHTML = total/divisor
    pontos.innerHTML = ((total/divisor-1)*25).toFixed(2)
}



const myForm = document.getElementById('notas')
myForm.addEventListener('keyup', ev=> {
    computarNota(myForm)
})
myForm.addEventListener('change', ev=> {
    computarNota(myForm)
})



// add eventHandler to buttons
for (const child of document.querySelectorAll('.input>button')) {
    const inputElement = child.parentElement.querySelector('input')
    child.onclick = (ev) => {
        ev.preventDefault();
        if (child.textContent === '-') inputElement.value = -(-inputElement.value + 1)
        if (child.textContent === '+') inputElement.value = -(-inputElement.value - 1)
        if (child.textContent === '>') {}
        if (child.textContent === 'upload') {}        
        computarNota(myForm)

    }
}

