function calcularSaida(horarios, horaExtra) {
    console.log(horarios, 'oii')
    var total = 0
    if (horarios.length == 1) total -= 15
    for (par of horarios) {
        console.log(par)
        if (par.length === 1) {
            now = new Date()
            par.push(now.getHours() + '' + now.getMinutes())
        }
        horas = par[1].slice(0, 2) - par[0].slice(0, 2)
        console.log(horas)
        minutos = par[1].slice(3, 5) - par[0].slice(3, 5)
        console.log(minutos)
        total += 60 * horas + minutos
    }
    return 'jornada de ' + (total > 420 ? '8h' : '6h') + '<br>' + total + ' minutos' + ' -> ' + (Math.trunc((total - (total > 420 ? 480 : 360)) / 6) / 10) + ' horas extras'
}

function calcular(event) {
    event.preventDefault()
    const form = document.getElementById('formHorarios').elements
    if (!document.getElementById('entrada1').value) {
        saida = document.getElementById('saida1').value
        hh = saida.slice(0, 2)
        mm = saida.slice(3, 5)
        minutes = 60 * hh + +mm - 370
        h = Math.floor(minutes / 60)
        m = minutes % 60
        if (h < 10) h = '0' + h
        if (m < 10) m = '0' + m
        document.getElementById('entrada1').value = h + ':' + m
        return
    }
    if (!document.getElementById('saida1').value) {
        entrada = document.getElementById('entrada1').value
        hh = entrada.slice(0, 2)
        mm = entrada.slice(3, 5)
        minutes = 60 * hh + +mm + 370
        h = Math.floor(minutes / 60)
        m = minutes % 60
        if (h < 10) h = '0' + h
        if (m < 10) m = '0' + m
        document.getElementById('saida1').value = h + ':' + m
        return
    }
    arr = []
    for (el of form) {
        if (el.tagName == 'INPUT') {
            if (el.value)
                arr.push(el.value)
        }
    }
    var outputArray = [];
    for (var i = 0; i < arr.length; i += 2) {
        outputArray.push(arr.slice(i, i + 2));
    }
    const result = calcularSaida(outputArray, true)
    document.getElementById('resposta').innerHTML = result
}
