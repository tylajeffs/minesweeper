
    //set the theme
    const setTheme = theme => document.documentElement.className = theme;
    document.getElementById('theme-select').addEventListener('change', function() {
    setTheme(this.value);
    });
    const themePicker = document.getElementById('theme-select');
    let theme = themePicker.options[themePicker.selectedIndex].value;
    themePicker.addEventListener("change", (e) => {
        theme = e.target.value;
      });
    

    //set the grid
    const grid = document.querySelector('.grid')
    const popup = document.getElementById('pop-up-banner')
    const title = document.getElementById('title')
    let width = 20 
    let squares = []
    let bombAmount = 20
    let flags = 0
    let isGameOver = false
    
    

    //create the board and start the game
    createBoard()



    //function to create the board
    function createBoard() {

        console.log("creating new board")

    

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

            //add event listener for a normal click
            square.addEventListener('click', function(e) {
                click(square)
                checkForWin()
            })

            //add event listener for ctrl and left click
            square.oncontextmenu = function(e) {
                e.preventDefault()
                addFlag(square)
                checkForWin()
            }
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
                if(i>9 && squares[i-width].classList.contains('bomb')) total++ //top
                if(i>10 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++
                if(i<99 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++
                if(i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) total++
                if(i<89 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++
                if(i<90 && squares[i+width].classList.contains('bomb')) total++ //bottom

                //set the total to the square
                squares[i].setAttribute('data',total)
                //console.log(squares[i])
            }
        }
    }


    //function to add flags 
    function addFlag(square) {

        if(isGameOver) return

        if(!square.classList.contains('checked') && flags<bombAmount) {
            //add a flag
            if(!square.classList.contains('flag')) {
                square.classList.add('flag')
                //which flag emoji to use?
                switch(theme) {
                    case 'classic':
                        square.innerHTML = '🚩'
                        break;
                    case 'ocean':
                        square.innerHTML = '🛟'
                        break;
                    case 'garden':
                        square.innerHTML = '🌺'
                        break;
                    case 'space':
                        square.innerHTML = '🌟'
                        break;
                }
        
                flags++
            } else {
                //remove a flag
                square.classList.remove('flag')
                square.innerHTML = ''
                flags--
            }
        } else if(!square.classList.contains('checked') && (flags === bombAmount) && square.classList.contains('flag')){
            square.classList.remove('flag')
            square.innerHTML =''
            flags--
        }
    }


    //funcion to handle clicking on square
    function click(square) {

        //if game is over, the square is already checked, or the square is flagged, leave
        if(isGameOver) return
        if(square.classList.contains('checked') || square.classList.contains('flag')) return

        //clicked a bomb
        if(square.classList.contains('bomb')) {
            gameOver(square)
            return
        } else {
            //get the square number
            let total = square.getAttribute('data')
            if(total!=0) {
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            //recursion call to check all squares around
            checkSquare(square)        
        }
        square.classList.add('checked')
    }


    //function to check neighboring squares once the square is clicked
    function checkSquare(square) {

        //check if the square is on the edge
        const isLeftEdge = (square.id%width === 0)
        const isRightEdge = (square.id%width === width-1)

        //make it wait 10 milliseconds before doing this part
        setTimeout(() => {
            if(square.id>0 && !isLeftEdge) { //left
                const newId = squares[parseInt(square.id)-1].id
                const newSquare = document.getElementById(newId)
                click(newSquare) //recursion
            }
            if(square.id>9 && !isRightEdge) { //top right corner
                const newId = squares[parseInt(square.id)+1-width].id
                const newSquare = document.getElementById(newId)
                click(newSquare) //recursion
            }
            if(square.id>9) { //above
                const newId = squares[parseInt(square.id)-width].id
                const newSquare = document.getElementById(newId)
                click(newSquare) //recursion
            }
            if(square.id>10 && !isLeftEdge) { //top left corner
                const newId = squares[parseInt(square.id)-1-width].id
                const newSquare = document.getElementById(newId)
                click(newSquare) //recursion
            }
            if(square.id<99 && !isRightEdge) { //right
                const newId = squares[parseInt(square.id)+1].id
                const newSquare = document.getElementById(newId)
                click(newSquare) //recursion
            }
            if(square.id<90 && !isLeftEdge) { //bottom left corner
                const newId = squares[parseInt(square.id)-1+width].id
                const newSquare = document.getElementById(newId)
                click(newSquare) //recursion
            }
            if(square.id<89 && !isRightEdge) { //bottom right corner
                const newId = squares[parseInt(square.id)+1+width].id
                const newSquare = document.getElementById(newId)
                click(newSquare) //recursion
            }
            if(square.id<90) { //bottom
                const newId = squares[parseInt(square.id)+width].id
                const newSquare = document.getElementById(newId)
                click(newSquare) //recursion
            }

        }, 10)
    }


    //function to handle game over
    function gameOver(square) {
        console.log("BOOM!")
        isGameOver = true
        square.classList.add('show-clicked-bomb')
        openPopUp("💀 GAME OVER 💀")

        //show ALL bombs 
        squares.forEach(square => {
            if(square.classList.contains('bomb')) {
                switch(theme) {
                    case 'classic':
                        square.innerHTML = '💣'
                        break;
                    case 'ocean':
                        square.innerHTML = '🦑'
                        break;
                    case 'garden':
                        square.innerHTML = '🐝'
                        break;
                    case 'space':
                        square.innerHTML = '👽'
                        break;
                }
            }
        })
    }


    //function to check for a win
    function checkForWin() {
        let matches = 0
        let checkedBoxes = 0

        for(let i=0; i<squares.length; i++) {
            //check that all bombs have been flagged
            if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                matches++
            }

            //check to make sure all boxes have been clicked
            if(squares[i].classList.contains('checked') || squares[i].classList.contains('bomb')) {
                checkedBoxes++
            }

            //are winning conditions met?
            if((matches === bombAmount) && (checkedBoxes === width*width)) {
                console.log("YOU WIN")
                isGameOver = true
                openPopUp("🎉 YOU WIN! 🎉")
            }
        }
    }


    //function to restart the game
    function restart(thisTheme = theme) {
        //reset 
        width = 10
        squares = []
        bombAmount = 20
        flags = 0
        isGameOver = false
        closePopUp()

        //clear the old board and create a new one
        grid.innerHTML = "";
        createBoard()


        //set the theme for the title
        switch(thisTheme) {
            case 'classic':
                title.innerHTML = 'Classic Minesweeper'
                break;
            case 'ocean':
                title.innerHTML = 'Ocean Minesweeper'
                break;
            case 'garden':
                title.innerHTML = 'Garden Minesweeper'
                break;
            case 'space':
                title.innerHTML = 'Space Minesweeper'
                break;
        }
    }

    
    //function to open the popup
    function openPopUp(message) {

        setTimeout(function(){
            popup.innerHTML = message
            popup.classList.add("open-popup")
        }, 300);
    }


    //function to close the popup
    function closePopUp() {
        popup.classList.remove("open-popup")
    }





//TODO add more levels
//TODO add button to switch from flag to no flag


