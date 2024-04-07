function DataAdicionar(data_informada, quantidade) {
    var fator = 24 * 60 * 60 * 1000;
    var nova_data = new Date(data_informada.getTime() + quantidade * fator);
    nova_data.setHours(0, 0, 0, 0);
    return nova_data;
}

function DataSubtrair(data_informada, quantidade) {
    var fator = 24 * 60 * 60 * 1000;
    var nova_data = new Date(data_informada.getTime() - quantidade * fator);
    nova_data.setHours(0, 0, 0, 0);
    return nova_data;
}



function FeriadosFixos(ano) {
    var resultados = [];
    //Array de datas no formato mes/dia.
    //OBS: O primeiro mes é 0 e o último mes é 11
    var datas = [[0, 1], [3, 21], [4, 1], [8, 7], [9, 12], [10, 2], [10, 15], [11, 25]];
    for (z = 0; z < datas.length; z++) {
        resultados.push(new Date(ano, datas[z][0], datas[z][1]).getTime());
    }
    return resultados;
}

function Pascoa(Y) {
    var C = Math.floor(Y / 100);
    var N = Y - 19 * Math.floor(Y / 19);
    var K = Math.floor((C - 17) / 25);
    var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I = I - 30 * Math.floor((I / 30));
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
    var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J = J - 7 * Math.floor(J / 7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40) / 44);
    var D = L + 28 - 31 * Math.floor(M / 4);
    return new Date(Y, M, D);
}

function getnumDiasUteis(startDate, dataFinal) {
    var numDiasUteis = 0;
    var arr1 = startDate.split('-');
    var arr2 = dataFinal.split('-');
    var dataAtual = new Date(arr1[0], arr1[1] - 1, arr1[2]);
    dataFinal = new Date(arr2[0], arr2[1] - 1, arr2[2]);
    var ano_inicial = dataAtual.getFullYear();
    var ano_final = dataFinal.getFullYear();
    var ano = ano_inicial;
    var feriados = [];
    for (x = ano; x <= ano_final; x++) {
        //OBS: O primeiro mes é 0 e o último mes é 11
        //Feriados fixos.
        feriados = feriados.concat(FeriadosFixos(ano));
        data_pascoa = Pascoa(ano);
        //Feriados variaveis de acordo com a data da Pascoa
        feriados.push(data_pascoa.getTime());
        feriados.push(DataAdicionar(data_pascoa, 60).getTime());
        feriados.push(DataSubtrair(data_pascoa, 48).getTime());
        feriados.push(DataSubtrair(data_pascoa, 47).getTime());
        feriados.push(DataSubtrair(data_pascoa, 2).getTime());
        ano++;
    }
    let firstDay = true;
    while (dataAtual <= dataFinal) {
        if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6 && !feriados.includes(dataAtual.getTime())) {
            numDiasUteis++;
        }
        if (firstDay) {
            //se o dia atual não for feriado ou fim de semana, então, contar as horas
            if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6 && !feriados.includes(dataAtual.getTime())) {
                numDiasUteis += 1+((dataAtual - new Date())/24/3600/1000)
            }
            firstDay = false
        }
        dataAtual = DataAdicionar(dataAtual, 1);
    }
    return numDiasUteis.toFixed(2);
}





function startTime() {
    document.getElementById('tictac').innerHTML = document.getElementById('tictac').innerHTML === 'tic tac...' ? 'tac tic...' : 'tic tac...'
    var posse = new Date(2024, 5, 3)
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    const currentDay = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate())
    const clockElement = document.getElementById('clock')
    clockElement.children[0].innerHTML = 'Tempo atual: ' + currentDay + ' - ' + h + ":" + m + ":" + s;
    days = Math.floor(((posse - today) / 1000)).toFixed(0) / 3600 / 24
    clockElement.children[1].innerHTML = 'Faltam apenas ' + Math.floor(((posse - today) / 1000)).toFixed(0) + ' segundos'
    clockElement.children[2].innerHTML = 'Isso dá ' + days.toFixed(2) + ' dias'
    clockElement.children[3].innerHTML = 'você pode considerar que são ' + getnumDiasUteis(currentDay, '2024-6-4') + ' dias úteis'
    t = setTimeout('startTime()', 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

startTime()