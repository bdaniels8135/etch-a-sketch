const ui = Object.freeze({
    gridContainer: document.querySelector('#grid-container'),
    sizeButtons: document.querySelectorAll('.button.size'),
    colorButtons: document.querySelectorAll('.button.color'),
    backgroundColorButtons: document.querySelectorAll('.button.grid-background'),
    eraseButton: document.querySelector('#erase-button'),
})

let gridBackgroundColor = 'white';
let penColor = 'black';

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
        eraseGrid();
    })    
}

function addGridElementMouseoverListeners() {
    const gridElements = document.querySelectorAll('.grid-element');
    for (const elem of gridElements) {
        elem.addEventListener('mouseover', () => {
            fillGridElement(elem);
        })
    }
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
            gridElement.style.backgroundColor = gridBackgroundColor;
            gridRow.appendChild(gridElement);
        }
    }
    addGridElementMouseoverListeners();
}

function deleteGrid() {
    ui.gridContainer.innerHTML = '';
}

function eraseGridElement(elem) {
    elem.style.backgroundColor = gridBackgroundColor;
}

function eraseGrid() {
    const gridElements = document.querySelectorAll('.grid-element');
    for (const elem of gridElements) {
        eraseGridElement(elem);
    }
}

function fillGridElement(elem) {
    elem.style.backgroundColor = penColor;
}

function fillGrid() {
    const gridElements = document.querySelectorAll('.grid-element');
    for (const elem of gridElements) {
        fillGridElement(elem);
    }
}

function resolveSizeButtonClick(button) {
    let newGridSize;
    switch (button.id) {
        case 'small-size-button':
            newGridSize = 10;
            break;
        case 'medium-size-button':
            newGridSize = 25;
            break;
        case 'large-size-button':
            newGridSize = 75;
            break;
        case 'custom-size-button':
            while (true) {
                let sizeInput = prompt('Enter a grid size between 1 and 100 (inclusive):');
                if (sizeInput == null) break;
                if (!Number.isInteger(Number(sizeInput)) || sizeInput < 1 || sizeInput > 100) {
                    alert('Invalid Input!');
                    continue;
                }
                newGridSize = Number(sizeInput);
                break;
            }
    }
    if (newGridSize) {
        for (const btn of ui.sizeButtons) {
            btn.classList.remove('active');
        }
        button.classList.add('active');
        deleteGrid();
        buildGrid(newGridSize);
    }
}

function resolveColorButtonClick(button) {
    let newPenColor;
    switch (button.id) {
        case 'black-color-button':
            newPenColor = 'black';
            break;
        case 'white-color-button':
            newPenColor = 'white';
            break;    
        case 'rainbow-color-button':
            alert('Sorry! The rainbow pen color button is still under construction.');
            break;
        case 'random-color-button':
            alert('Sorry! The random pen color button is still under construction.');
            break;
        case 'custom-color-button':
            alert('Sorry! The custom pen color button is still under construction.');
    }
    if (newPenColor) {
        for (const btn of ui.colorButtons) {
            btn.classList.remove('active');
        }
        button.classList.add('active');
        penColor = newPenColor;
    }
}

function resolveBackgroundColorButtonClick(button) {
    let newGridBackgroundColor;
    switch (button.id) {
        case 'white-background-button':
            newGridBackgroundColor = 'white';
            break;
        case 'black-background-button':
            newGridBackgroundColor = 'black';
            break;
        case 'custom-background-button':
            alert('Sorry! The custom background color button is still under construction.');
    }
    if (newGridBackgroundColor) {
        for (const btn of ui.backgroundColorButtons) {
            btn.classList.remove('active');
        }
        button.classList.add('active');
        gridBackgroundColor = newGridBackgroundColor;
        eraseGrid();
    } 
}

document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
    addButtonClickListeners();
    addGridElementMouseoverListeners();
})
