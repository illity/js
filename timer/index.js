function startTime() {
    document.getElementById('tictac').innerHTML = document.getElementById('tictac').innerHTML==='tic tac...'?'tac tic...':'tic tac...'
    var posse = new Date(2024, 5, 3)
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    const clockElement = document.getElementById('clock')
    clockElement.children[0].innerHTML='Agora são ' + h+":"+m+":"+s;
    days = Math.floor(((posse-today)/1000)).toFixed(0)/3600/24
    clockElement.children[1].innerHTML='Faltam apenas ' + Math.floor(((posse-today)/1000)).toFixed(0) + ' segundos'
    clockElement.children[2].innerHTML='Isso dá ' + days.toFixed(2) + ' dias'
    t=setTimeout('startTime()',500);
}

function checkTime(i){
    if (i<10) {
        i="0" + i;
    }
    return i;
}

startTime()