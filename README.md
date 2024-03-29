# Minesweeper

## Project Overview

An application made to mimic the classic minesweeper game. Includes custom levels and themes, built with vanilla Javascript, HTML & CSS.

## Project Screenshots/Demo Video

**Includes 4 different themes:** classic, ocean, garden, & space.

<img width="235" alt="Screen Shot 2024-03-06 at 11 40 36 AM" src="https://github.com/tylajeffs/minesweeper/assets/40805521/ee67ff81-c002-4c86-947f-6bd48167c8c4">
<img width="235" alt="Screen Shot 2024-03-06 at 11 41 51 AM" src="https://github.com/tylajeffs/minesweeper/assets/40805521/5acf4348-275f-4501-a172-68eff8d76a92">
<img width="235" alt="Screen Shot 2024-03-06 at 11 43 03 AM" src="https://github.com/tylajeffs/minesweeper/assets/40805521/9407ed21-2053-4334-8eed-fa5034c321d5">
<img width="235" alt="Screen Shot 2024-03-06 at 11 45 01 AM" src="https://github.com/tylajeffs/minesweeper/assets/40805521/9f1edd79-7082-4697-a413-b9b25ae6b477">
<br>
<br>


https://github.com/tylajeffs/minesweeper/assets/40805521/0e4f5ffe-8c9b-4d8f-9970-b137f6b55fa7



## Installation and Setup Instructions

Clone down this repository. You will need `Visual Studio Code` and the [`Live Server`](https://vscode:extension/ritwickdey.LiveServer) extension. (Or, feel free to use any other IDE!)
```
git clone https://github.com/tylajeffs/minesweeper.git
```

**To run:**

Right click the html file and click on `Open with Live Server`. This will automatically open the project in a new tab.

![LiveServerDemo](https://github.com/tylajeffs/minesweeper/assets/40805521/9234500f-ace7-4d5b-a628-12ec6e11b4cb)



## Built With
- Javascript
- HTML
- CSS

## Reflection
This was a project I made during a break between semesters while getting my degree in CS. I wanted to build a minesweeper game because I loved playing it as a child. I've only done minimal coding with Javascript before, so I built this project using vanilla Javascript, HTML, and CSS to build up my skills in those areas. 

One of the main challenges I ran into was checking the neighboring squares when a user clicked a square that wasn't a bomb. Sometimes, the neighboring squares needed to have a number representing the number of bombs they were touching, but other times, the squares weren't touching any bombs, and clicking it would open up a larger area. After researching and using my whiteboard to diagram it, I used recursion to check the squares, solving the problem. 
