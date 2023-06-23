const ui = Object.freeze({
    gridContainer: document.querySelector('#grid-container')
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

function deleteGrid() {
    ui.gridContainer.innerHTML = '';
}

function eraseGridElement(elem) {
    elem.style.color = 'white';
}

function eraseGrid() {
    let gridElements = document.querySelectorAll('.grid-element');
    for (const elem of gridElements){
        eraseGridElement(elem);
    }
}

function fillGrid() {
    let gridElements = document.querySelectorAll('.grid-element');
    for (const elem of gridElements){
        elem.style.color = 'black';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
})
