const html = String.raw
const s = '3'
const gallery = html`<div class="grid sm:grid-cols-3 lg:grid-cols-5 gap-8 p-8">
</div>`
console.log(gallery)
const galleryElem = document.getElementById('gallery')
galleryElem.innerHTML = gallery
for (const el of [
    {
        'img': 'https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg',
        'title': 'first one',
        'desc': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, porro? Est odit facere quia, temporibus autem porro, eos dolor laudantium, exercitationem repellat quod. Debitis delectus temporibus repudiandae, voluptatem asperiores autem?'
    },
    {
        'img': 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
        'title': 'second one',
        'desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sapiente accusamus, voluptates officiis rerum ducimus modi nesciunt temporibus molestias ipsam, magnam nisi natus consectetur cumque recusandae, neque quod dignissimos aut?'
    },
    {},
    {},
    {},
    {}
]) {
    const x = html`<div class="border border-black border-opacity-20 rounded-xl aspect-square flex flex-col bg-black bg-opacity-40">
            <img src="${el['img']}" alt="${el['img']}" class="flex-grow rounded-t-xl bg-black flex text-center justify-center items-center text-4xl">         
            <div class="h-[25%] overflow-hidden px-3 py-1">
                <div class="font-bold text-center">
                    ${el['title']}
                </div>
                <div class="text-xs text-white text-opacity-50 text-justify">
                    ${el['desc']}
                </div>
            </div>
        </div>
    `
    const elem = document.createElement('div')
    elem.innerHTML = x
    galleryElem.firstChild.appendChild(elem.firstChild)
    console.log(x)
}

const abc = '${}'