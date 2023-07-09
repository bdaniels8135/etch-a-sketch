const ui = Object.freeze({
    gridContainer: document.querySelector('#grid-container'),
    sizeButtons: document.querySelectorAll('.button.size'),
    colorButtons: document.querySelectorAll('.button.color'),
    backgroundColorButtons: document.querySelectorAll('.button.grid-background'),
    eraseButton: document.querySelector('#erase-button')
})

function addButtonClickListeners() {
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
    
    for (const button of ui.backgroundColorButtons) {
        button.addEventListener('click', () => {
            resolveBackgroundColorButtonClick(button);
        })
    }
    
    ui.eraseButton.addEventListener('click', () => {
        resolveEraseButtonClick()
    })    
}

function buildGrid(dimension = 25) {
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

function resolveBackgroundColorButtonClick(button) {
    for (const btn of ui.gridBackgroundButtons) {
        btn.classList.remove('active');
    }
    button.classList.add('active');
    console.log(button.id);
}

function resolveEraseButtonClick() {
    console.log(ui.eraseButton.id);
}

document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
    addButtonClickListeners();
})
