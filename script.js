const ui = Object.freeze({
    gridContainer: document.querySelector('#grid-container'),
    sizeButtons: document.querySelectorAll('.button.size'),
    colorButtons: document.querySelectorAll('.button.color'),
    backgroundColorButtons: document.querySelectorAll('.button.grid-background'),
    eraseButton: document.querySelector('#erase-button'),
    customBackgroundColorInput: document.querySelector('#custom-background-input'),
    customPenColorInput: document.querySelector('#custom-color-input'),
})

let gridBackgroundColor = '#ffffff';
let penColor = '#000000';
let rainbowPenColor = false;
let randomPenColor = false;

function addMenuListeners() {
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

    ui.customBackgroundColorInput.addEventListener('change', (event) => {
        for (const btn of ui.backgroundColorButtons) {
            btn.classList.remove('active');
        }
        event.target.classList.add('active');
        gridBackgroundColor = event.target.value;
        eraseGrid();
    })

    ui.customPenColorInput.addEventListener('change', (event) => {
        for (const btn of ui.colorButtons) {
            btn.classList.remove('active');
        }
        event.target.classList.add('active');
        rainbowPenColor = false;
        randomPenColor = false;
        penColor = event.target.value;
    })
}

function getRandomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function getNextRainbowColor() {
    const rainbowColors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'];
    let nextRainbowColor = rainbowColors[rainbowColors.indexOf(penColor) + 1];
    return nextRainbowColor ? nextRainbowColor : '#ff0000';
}

function addGridElementMouseoverListeners() {
    const gridElements = document.querySelectorAll('.grid-element');
    for (const elem of gridElements) {
        elem.addEventListener('mouseover', () => {
            if (randomPenColor) {
                penColor = getRandomColor();
                ui.customPenColorInput.value = penColor;
            }
            fillGridElement(elem);
            if (rainbowPenColor) {
                penColor = getNextRainbowColor();
                ui.customPenColorInput.value = penColor;
            }
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
    randomPenColor = false;
    rainbowPenColor = false;
    let newPenColor;
    switch (button.id) {
        case 'black-color-button':
            newPenColor = '#000000';         
            break;
        case 'white-color-button':
            newPenColor = '#ffffff';
            break;    
        case 'rainbow-color-button':
            rainbowPenColor = true;
            newPenColor = '#ff0000';
            break;
        case 'random-color-button':
            randomPenColor = true;
            newPenColor = getRandomColor();
    }
    if (newPenColor) {
        for (const btn of ui.colorButtons) {
            btn.classList.remove('active');
        }
        ui.customPenColorInput.classList.remove('active');
        button.classList.add('active');
        penColor = newPenColor;
        ui.customPenColorInput.value = penColor;
    }   
}

function resolveBackgroundColorButtonClick(button) {
    let newGridBackgroundColor;
    switch (button.id) {
        case 'white-background-button':
            newGridBackgroundColor = '#ffffff';
            break;
        case 'black-background-button':
            newGridBackgroundColor = '#000000';
            break;
        case 'random-background-button':
            newGridBackgroundColor = getRandomColor();
    }
    if (newGridBackgroundColor) {
        for (const btn of ui.backgroundColorButtons) {
            btn.classList.remove('active');
        }
        ui.customBackgroundColorInput.classList.remove('active');
        button.classList.add('active');
        gridBackgroundColor = newGridBackgroundColor;
        ui.customBackgroundColorInput.value = gridBackgroundColor;
        eraseGrid();
    } 
}

document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
    addMenuListeners();
})
