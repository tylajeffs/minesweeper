document.addEventListener('DOMContentLoaded', () => {

    //set the grid
    const grid = document.querySelector('.grid')
    let width = 10 //set how many squares width
    let squares = []
    let bombAmount = 20
    let isGameOver = false

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

            //add event listener for click
            square.addEventListener('click', function(e) {
                click(square)
            })
        }


        //add numbers to the surrounding squares
        for(let i=0; i<squares.length; i++) {
            let total = 0
            //check if the square is on the edge
            const isLeftEdge = (i%width === 0)
            const isRightEdge = (i%width === width-1)

            if(squares[i].classList.contains('valid')) {

                if(i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++
                if(i>9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) total++
                if(i>10 && squares[i-width].classList.contains('bomb')) total++ //top
                if(i>11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++
                if(i<98 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++
                if(i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) total++
                if(i<88 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++
                if(i<89 && squares[i+width].classList.contains('bomb')) total++ //bottom

                //set the total to the square
                squares[i].setAttribute('data',total)
                console.log(squares[i])
            }
        }





    }

    //actually create the board
    createBoard()


    //funcion to handle clicking on square
    function click(square) {

        //if game is over, the square is already checked, or the square is flagged, leave
        if(isGameOver) return
        if(square.classList.contains('checked') || square.classList.contains('flag')) return

        //clicked a bomb
        if(square.classList.contains('bomb')) {
            console.log('Game Over!')
        } else {
            //get the square number
            let total = square.getAttribute('data')
            if(total!=0) {
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            square.classList.add('checked')
        }

    }






})