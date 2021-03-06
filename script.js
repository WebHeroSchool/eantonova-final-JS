const difficulty = {
        easy: 3,
        medium: 6,
        hard: 10
    };

const easyContainer = `<div class="game__easy  cards">
        <div class="game__easy-wrap  cards__container"></div>
    </div>`;
const mediumContainer = `<div class="game__medium  cards">
        <div class="game__medium-wrap  cards__container"></div>
    </div>`;
const hardContainer = `<div class="game__hard  cards">
        <div class="game__hard-wrap  cards__container"></div>
    </div>`;
const card = `<div class="cards__wrap" id="#">
        <div class="cards__back"></div>
        <div class="cards__front"></div>
    </div>`;

const menu = document.getElementById('menu');
const field = document.getElementsByClassName('game')[0];

let canPlay = true;

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

function reloadGame() {
    field.innerHTML = '';
    menu.classList.remove('hidden');
    canPlay = true;
};

function pickCard(bug) {
    if (canPlay === true) {
        let cardPicture = this.querySelector('.cards__front');
        if (Number(this.getAttribute('id')) === bug) {
            cardPicture.classList.replace('cards__front', 'cards__bug');
        }
        this.classList.add('active');
        canPlay = false;
    } else {
        reloadGame();
    }
};

function play() {
    menu.classList.add('hidden');
    const radiobtn = document.querySelector('input[type=radio]:checked');
    const level = radiobtn.getAttribute('value');
    switch (level) {
        case 'easy':
            field.innerHTML = easyContainer;
            break;
        case 'medium':
            field.innerHTML = mediumContainer;
            break;
        case 'hard':
            field.innerHTML = hardContainer;
            break;
    };
    
    const cardsAmount = difficulty[level];
    let cards = '';
    const container = document.querySelector('.cards__container');
    for(let i = 1; i <= cardsAmount; i++) {
        cards += card.replace('#', i);
    };
    container.innerHTML = cards;

    const bug = random(1, cardsAmount + 1);

    const wrapCards = document.querySelectorAll('.cards__wrap');

    wrapCards.forEach(oneCard => {
        oneCard.addEventListener('click', pickCard.bind(oneCard, bug));
    });
};

const btn = document.getElementById('start-game');
btn.addEventListener('click', play);