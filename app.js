document.addEventListener('DOMContentLoaded', () => {

    //set the grid
    const grid = document.querySelector('.grid')
    let width = 10 //set how many squares width
    let squares = []
    let bombAmount = 20

    //function to create the board
    function createBoard() {

        //create random bomb placement
        const bombArray = Array(bombAmount).fill('bomb')
        const emptySquaresArray = Array(width*width - bombAmount).fill('valid')
        const gameArray = emptySquaresArray.concat(bombArray)
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)



        //create the board
        for(let i=0; i<width*width; i++) {
            //create the square, give it a unique id and class
            const square = document.createElement('div')
            square.setAttribute('id',i);
            square.classList.add(shuffledArray[i])

            //add the square to the grid and to the array of squares
            grid.appendChild(square)
            squares.push(square)
        }
    }

    //actually create the board
    createBoard()

})