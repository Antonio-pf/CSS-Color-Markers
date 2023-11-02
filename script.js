const cards = document.querySelectorAll('.card');
let movendo = null;

document.addEventListener("dragstart", (event) => {
    movendo = event.target;
    event.target.classList.add('movendo');
});

document.addEventListener("dragend", (event) => {
    movendo.classList.remove('movendo');
    movendo = null;
});

cards.forEach((card) => {
    card.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (movendo !== null) {
            const anterior = getNewPosition(card, e.clientY);
            if (anterior) {
                card.insertAdjacentElement("beforeend", movendo);
            } else {
                card.insertAdjacentElement("afterbegin", movendo);
            }
        }
    });
});

function getNewPosition(card, posY) {
    const cards = card.querySelectorAll(".marker:not(.movendo)");
    let resultado = null;

    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenter = box.top + box.height / 2;

        if (posY >= boxCenter) {
            resultado = refer_card;
        }
    }

    return resultado;
}

document.addEventListener('DOMContentLoaded', function() {
    const changeTheme = document.getElementById('changeTheme');
    changeTheme.addEventListener('click', function() {
        const body = document.body;

        const corAtual = getComputedStyle(body).backgroundColor;

        if (corAtual === 'rgb(0, 0, 0)') {
            body.style.backgroundColor = '#FFFFFF';
        } else {
            body.style.backgroundColor = '#000000';
        }
    });
});