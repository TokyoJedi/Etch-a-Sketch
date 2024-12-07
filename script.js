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
            row.setAttribute('opacity', '.1');
            container.appendChild(row);
            for (j = 0; j < squares; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.setAttribute('opacity', '.1');
                row.appendChild(square);
            }
        }
        addColorChangeOnHover();
    }

    // Add pixel trail to squares
    addColorChangeOnHover = () => {
        const children = Array.from(container.childNodes);

        children.forEach((v) => {
            v.addEventListener("mouseover", (e) => {
                const red = parseInt(Math.random() * 256);
                const green = parseInt(Math.random() * 256);
                const blue = parseInt(Math.random() * 256);
                let opacity = parseFloat(e.target.getAttribute('opacity'));

                let redAttr = e.target.getAttribute('red') || e.target.setAttribute('red', red);
                let greenAttr = e.target.getAttribute('green') || e.target.setAttribute('green', green);
                let blueAttr = e.target.getAttribute('blue') || e.target.setAttribute('blue', blue);
                
                if (e.target.classList[1] === 'hovered') {
                    opacity += 0.1;
                    e.target.setAttribute('opacity', opacity);
                    console.log(opacity);
                    e.target.style.backgroundColor = `rgba(
                        ${redAttr}, 
                        ${greenAttr}, 
                        ${blueAttr}, ${opacity})`;
                        return
                }

                e.target.style.backgroundColor = `rgba(
                    ${redAttr}, 
                    ${greenAttr}, 
                    ${blueAttr}, ${opacity})`;

                e.target.classList.add('hovered');

            })
        });
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

    // Reset grid to empty state
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