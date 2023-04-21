document.addEventListener('DOMContentLoaded', () => {

    //set the grid
    const grid = document.querySelector('.grid')
    let width = 10 //set how many squares width
    let squares = []

    //functino to create the board
    function createBoard() {
        for(let i=0; i<width*width; i++) {
            //create the square and give it a unique id
            const square = document.createElement('div')
            square.setAttribute('id',i);

            //add the square to the grid and to the array of squares
            grid.appendChild(square)
            squares.push(square)
        }
    }

    //actually create the board
    createBoard()

})