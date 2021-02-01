const l = document.querySelector('.content');
const dl = getDices();

function rollDice(dice) {
    const d = dl.hasOwnProperty(dice) && dl[dice];
    if (d) {
        let v = d.values[Math.floor(Math.random() * d.values.length)];
        const color = d.color;
        const actual = parseInt(document.querySelector(`.result-${color}`).textContent, 10);
        if (!isNaN(actual)) v += actual;
        document.querySelector(`.result-${color}`).textContent = v;
    }
}

function diceListener(e) {
    const dice = e.target.getAttribute('data-ref');

    rollDice(dice);
}

function createDice(color, name) {
    const dice = document.createElement('div');
    dice.classList.add('item', color);
    dice.setAttribute('data-ref', name);
    dice.textContent = `${name}`;
    dice.addEventListener('click', diceListener, false);

    return dice;
}

function createDices(diceList) {
    for (let d in diceList) {
        if (diceList.hasOwnProperty(d)) {
            const {color} = dices[d];
            l.appendChild(createDice(color, d));
        }
    }
}

function reset() {
    document.querySelectorAll('#result span').forEach(e => {
        e.textContent = '0';
    });
}

createDices(dl);

document.getElementById('reset').addEventListener('click', reset, false);
