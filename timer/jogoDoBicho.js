const bichos = `avestruz 🐦
águia 🦅
burro 🐴
borboleta 🦋
cachorro 🐶
cabra 🐐
carneiro 🐏
camelo 🐫
cobra 🐍
coelho 🐰
cavalo 🐴
elefante 🐘
galo 🐓
gato 🐈
jacaré 🐊
leão 🦁
macaco 🐒
porco 🐷
pavão 🦚
peru 🦃
touro 🐂
tigre 🐯
urso 🐻
veado 🦌
vaca 🐮`.split('\n')

function randInt(min, max) {
    return min + self.crypto.getRandomValues(new Uint32Array(1))[0]%(max-min+1)
}

html = String.raw

Array.from(document.getElementById('jogoDoBicho').children).forEach(element => {
    const milhar = randInt(0,9999)
    element.innerHTML = html`
    <span>${milhar.toString().padStart(4, "0")}</span>
    <span>${bichos[Math.floor((milhar+1)%100/4)]}</span>` 
});

//randInt(0,9999)