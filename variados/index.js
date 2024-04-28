for (button of document.querySelectorAll('button')) {
    if (button.innerText === 'Não') {
        noButton = button
    }
    if (button.innerText === 'Sim') {
        yesButton = button
    }
}

anyElement = document.createElement('div')
noButton.addEventListener('mouseover', ()=>{
    noButton.replaceWith(anyElement)
    yesButton.replaceWith(noButton)
    anyElement.replaceWith(yesButton)
})
noButton.addEventListener('click', () => {
    noButton.replaceWith(anyElement)
    yesButton.replaceWith(noButton)
    anyElement.replaceWith(yesButton)
    setTimeout(()=>{alert('tivemos um problema, tente novamente')},100)
})
yesButton.addEventListener('mouseover', () => {
    yesButton.innerText = 'SIM!!!!'
})
yesButton.addEventListener('mouseout', () => {
    yesButton.innerText = 'Sim'
})

yesButton.addEventListener('click', () => {
    document.body.innerHTML = ''
    const div = document.body.appendChild(document.createElement('div'))
    const today = new Date()
    const day = today.getDate()+1+'-'+(today.getMonth()+1)+'-'+(today.getFullYear())
    div.innerText='A cerimônia está marcada para ' + day        
    console.log(new Date().toString('%d'))
    setTimeout(()=>{alert('Excelente escolha!')}, 100)
})