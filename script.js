const ui = Object.freeze({
    gridContainer: document.querySelector('#grid-container'),
    sizeButtons: document.querySelectorAll('.button.size'),
    colorButtons: document.querySelectorAll('.button.color'),
    gridBackgroundButtons: document.querySelectorAll('.button.grid-background')
})

function buildGrid(dimension = 16) {
    let gridRow;
    let gridElement;
    for (let i = 0; i < dimension; i++) {
        gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        ui.gridContainer.appendChild(gridRow);
        for (let j = 0; j < dimension; j++) {
            gridElement = document.createElement('div');
            gridElement.classList.add('grid-element');
            gridRow.appendChild(gridElement);
        }
    }
}

for (const button of ui.sizeButtons) {
    button.addEventListener('click', () => {
        resolveSizeButtonClick(button);
    })
}

for (const button of ui.colorButtons) {
    button.addEventListener('click', () => {
        resolveColorButtonClick(button);
    })
}

for (const button of ui.gridBackgroundButtons) {
    button.addEventListener('click', () => {
        resolveGridBackgroundButtonClick(button);
    })
}

function resolveSizeButtonClick(button) {
    for (const btn of ui.sizeButtons) {
        btn.classList.remove('active');
    }
    button.classList.add('active');
    console.log(button.id);
}

function resolveColorButtonClick(button) {
    for (const btn of ui.colorButtons) {
        btn.classList.remove('active');
    }
    button.classList.add('active');
    console.log(button.id);
}

function resolveGridBackgroundButtonClick(button) {
    for (const btn of ui.gridBackgroundButtons) {
        btn.classList.remove('active');
    }
    button.classList.add('active');
    console.log(button.id);
}

function deleteGrid() {
    ui.gridContainer.innerHTML = '';
}

function eraseGridElement(elem) {
    elem.style.backgroundColor = 'white';
}

function eraseGrid() {
    const gridElements = document.querySelectorAll('.grid-element');
    for (const elem of gridElements) {
        eraseGridElement(elem);
    }
}

function fillGridElement(elem) {
    elem.style.backgroundColor = 'black';
}

function fillGrid() {
    const gridElements = document.querySelectorAll('.grid-element');
    for (const elem of gridElements) {
        fillGridElement(elem);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
})
