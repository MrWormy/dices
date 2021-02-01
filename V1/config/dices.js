const dices = {
    'Rouge 1': {color: 'red', values: [1,1,1,2,2,3]},
    'Rouge 2M': {color: 'red', values: [2,3,3,4,4,4]},
    'Rouge 2T': {color: 'red', values: [3,3,3,4,4,4]},
    'Rouge 3': {color: 'red', values: [3,4,4,5,5,6]},
    'Bleu 1': {color: 'blue', values: [1,1,1,2,2,3]},
    'Bleu 2M': {color: 'blue', values: [2,3,3,4,4,4]},
    'Bleu 2T': {color: 'blue', values: [3,3,3,4,4,4]},
    'Bleu 3': {color: 'blue', values: [3,4,4,5,5,6]},
    'Vert 1': {color: 'green', values: [1,1,1,2,2,3]},
    'Vert 2M': {color: 'green', values: [2,3,3,4,4,4]},
    'Vert 2T': {color: 'green', values: [3,3,3,4,4,4]},
    'Vert 3': {color: 'green', values: [3,4,4,5,5,6]},
    'Neutre 1': {color: 'neutral', values: [1,1,1,1,2,2]},
    'Neutre 2': {color: 'neutral', values: [3,3,3,4,4,6]},
    'Neutre 3': {color: 'neutral', values: [4,5,6,6,7,8]},
    'Depart 3': {color: 'neutral', values: [2,3,3,4,4,5]}
};

function getDices() {
    const settings = localStorage.getItem('dices');
    try {
        const dices = JSON.parse(settings);
        if (Array.isArray(dices)) return dices;
    } catch (e) {
        console.error(e);
    }
    return [];
}

function setDices(dices) {
    try {
        localStorage.setItem('dices', JSON.stringify(dices));
    } catch (e) {
        console.error(e);
    }
}

function addDice(ref) {
    const dices = getDices();
    dices.push(ref);
    setDices(dices);
}

function removeDice(ref) {
    const dices = getDices();
    let ind;
    if ((ind = dices.indexOf(ref)) >= 0) {
        setDices(dices.slice(0, ind).concat(dices.slice(ind + 1)));
    }
}
