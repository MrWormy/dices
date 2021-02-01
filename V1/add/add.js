const dl = document.querySelector('.container');

function diceListener(e) {
    const dice = e.target.getAttribute('data-ref');

    addDice(dice);
    return true;
}

function createDice(color, name, values) {
    const dice = document.createElement('a');
    dice.href = '../';
    dice.classList.add('item', color);
    dice.setAttribute('data-ref', name);
    dice.textContent = `${name} - ${values.join('/')}`;
    dice.addEventListener('click', diceListener, false);

    return dice;
}

for(let [name, {color, values}] of Object.entries(dices)) {
    dl.appendChild(createDice(color, name, values));
}
