//---------------DOM 

// creating the grid

const gameBoard = document.querySelector(".game-board");

for(let i  = 0 ; i<9 ;i++){
    const cell  = document.createElement("div");
    cell.id = `${i}`;
    cell.className = "cell";
    gameBoard.appendChild(cell);

    cell.addEventListener("click",()=>{
        markSymbol(i);
    })
}


//addiing functionality on start button

const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click" , () =>{
    let input1 = document.getElementById("player1").value;
    let input2 = document.getElementById("player2").value;

    createPlayer(input1,"❌");
    createPlayer(input2,"⭕");

    // clearing the input field
    document.getElementById("player1").value ="";
    document.getElementById("player2").value = "";

    //intializing the display
    showStatus(players[0]);

    //setting the turn 
    turn = 1;


})

//adding functionality on resetButton

const resetBtn = document.getElementById("restart-btn");

resetBtn.addEventListener("click" , () => {

    removePlayer();
    gridClean();
    turn =1;
    document.getElementById("status").textContent = "";
})



//---------LOGIC


let players = []; // contain player object


function createPlayer(name,symbol){
    let pos = [];

    let obj = {name:name,symbol:symbol,positionsAcquired:pos,};
    players.push(obj);

};

let turn = -1; //for turn considering 1 for player 1 and 0 for player 2



function markSymbol(position){ // treating id_number as position


    let clicked_cell = document.getElementById(position);

    if(clicked_cell.textContent === ""){

        //to decide the current player
        let currentPlayer;
        let nextPlayer;
        if(turn === 1){
            currentPlayer = players[0];
            nextPlayer = players[1];
            --turn;
        }
        else if(turn === 0){
            currentPlayer = players[1];
            nextPlayer = players[0];
            turn++;
        }

        //Updating the players PositionAcquired

        currentPlayer.positionsAcquired.push(position);

        //updating the content
        clicked_cell.textContent = `${currentPlayer.symbol}`;

        //the order in which you call these function is really important
        showStatus(nextPlayer);
        checkWinner(currentPlayer);


    }
    else{
        alert("Sorry That's Done");
    }

    return;

};

function checkWinner(currentPlayer){
    const winnerCombination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    let arr = currentPlayer.positionsAcquired;

    const hasWon = winnerCombination.some(combination =>
        combination.every(pos => arr.includes(pos))
    );

    if(hasWon=== true){
        showStatus(currentPlayer,hasWon);
    }

};

//To update the status


function showStatus(currentPlayer,hasWon = false){

    let status = document.getElementById("status");
    if(hasWon === true){
        status.textContent = `${currentPlayer.name} has won 🥳`;
        removePlayer();
    }
    else if(currentPlayer.name !== ""){
        status.textContent = `it's ${currentPlayer.name} turn`;
    }
    else if(currentPlayer.name!== "" && currentPlayer.positionsAcquired >3 && hasWon ===false){
        status.textContent = "It's a Tie";
    }
    

}


//for reset button function
function gridClean(){
    for(let i = 0 ; i<9 ; i++){
        document.getElementById(`${i}`).textContent = "";
    }
    return;
}

function removePlayer(){
    players.pop();
    players.pop();
    turn =-1;

}


