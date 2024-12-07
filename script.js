/**
 * Base script file
 * TOP - Etch-a-Sketch
 * Eric Rodriguez
 */

// On DOMContentLoaded, init script with variable assignments
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('#container');
    const button = document.querySelector('#button-for-prompt');

    // Create a 16 x 16 grid
    createGrid = (squares = 16) => {
        for (i = 0; i < squares; i++) {
            const row = document.createElement("div");
            row.classList.add('row');
            container.appendChild(row);
            for (j = 0; j < squares; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                row.appendChild(square);
            }
        }
    }

    // Prompt for new dimensions with validation, call reset, and call createGrid
    promptForSquares = () => {

        let squaresPerSide = prompt("How many squares per side (0-100)?");

        if (squaresPerSide < 0 || squaresPerSide > 100) {
            alert("Please set a value between 0-100.");
            return promptForSquares();
        }

        resetSketch();
        return createGrid(squaresPerSide);
    };

    // Add click event for prompt
    button.addEventListener("click", promptForSquares);

    // Reset grid when called
    resetSketch = () => {
        const allRows = Array.from(document.getElementsByClassName('row'));
        const allSquares = Array.from(document.getElementsByClassName('square'));

        allRows.forEach((v) => {
            v.remove();
        });
        allSquares.forEach((v) => {
            v.remove();
        });
    };

    // init default grid
    createGrid();
});