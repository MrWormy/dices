const l = document.querySelector('.lateral');
const firstDice = document.querySelector('.lateral .item');

function diceListener(e) {
    const dice = e.target.getAttribute('data-ref');

    l.removeChild(e.target);
    removeDice(dice);
    rd();
}

function createDice(color, name, values) {
    const dice = document.createElement('div');
    dice.classList.add('item', color);
    dice.setAttribute('data-ref', name);
    dice.textContent = `${name} - ${values.join('/')}`;
    dice.addEventListener('click', diceListener, false);

    return dice;
}

function createDices(diceList) {
    diceList.forEach(d => {
        if (dices.hasOwnProperty(d)) {
            const {color, values} = dices[d];
            l.insertBefore(createDice(color, d, values), firstDice);
        }
    });
}

function mapSet(map, key, value) {
    if (map.has(key)) {
        map.set(key, map.get(key) + value);
    } else map.set(key, value);
}

function roll(diceList) {
    const result = new Map([["total", 0],["neutral", 0],["red", 0],["blue", 0],["green", 0]]);
    
    diceList.forEach(d => {
       if (dices.hasOwnProperty(d)) {
           const {color, values} = dices[d];
           const rollV = values[Math.floor(Math.random() * values.length)];
           mapSet(result, color, rollV);
           mapSet(result, 'total', rollV);
       }
    });
    
    return result;
}

function displayRoll(roll) {
    for (let [color, result] of roll){
        document.querySelector(`.result-${color}`).textContent = result;
    }
}

function rd() {
    const dl = getDices();
    displayRoll(roll(dl));
}

const dl = getDices();
createDices(dl);
displayRoll(roll(dl));

document.getElementById('reroll').addEventListener('click', rd, false);
