const guiPlayerList = document.querySelector('.gui-player-list') //player list that appears on the screen
const form = document.querySelector(".form"); //Input used to add new players
const nameInput = document.querySelector(".name-input"); // Used to set initial input placeholder text
const nextRoundButton = document.querySelector(".next-round-button")
const startTournamentButton = document.querySelector('.start-tournament-button');
const allPlayers = []; //Stores data of all players in the tournament
const allRounds = document.querySelector('.all-rounds'); //Scores the data of all tournament rounds
const completeTournamentButton = document.querySelector('.complete-tournament'); 
const results = document.querySelector('.results');
let roundNum = 1;

//Class used to create a new player
class Player {
    constructor(name, points) {
        this.name = name;
        this.points = points;
    }

    changePoints(newPoints) {
        this.points = newPoints;
    }

    changeName(newName) {
        this.name = newName;
    }
}


//Creates a new player in both the frontend and backend once the user has entered a name and clicked submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newName = document.createElement('div');
    newName.innerText = e.target[0].value;
    guiPlayerList.appendChild(newName); //Adds new player's name to the GUI
    const player = new Player(e.target[0].value, 0); //creates a new player instance
    allPlayers.push(player);
    nameInput.value = '';
});

startTournamentButton.addEventListener('click', (e) => {
    e.preventDefault();
    playRound(allPlayers, roundNum);
    roundNum++;
})

nextRoundButton.addEventListener('click', (e) => {
    e.preventDefault();
    playRound(allPlayers, roundNum);
    roundNum++;   
})

completeTournamentButton.addEventListener('click', (e) => {
    //handle the completion of the tournament
    //creates the necessary result divs, adds the proper text, and displays them on the screen
    e.preventDefault();
    const finalHr = document.createElement('hr');
    results.appendChild(finalHr);
    const resultsHeading = document.createElement('h3');
    resultsHeading.classList.add('centered');
    resultsHeading.innerText = "Final Results";
    results.appendChild(resultsHeading);
    const resultsGrid = document.createElement('div');
    resultsGrid.classList.add('results-grid');
    results.appendChild(resultsGrid);

    //Prints out each player's name and score
    for (let player of allPlayers) {  
        const finalScoreName = document.createElement('div');
        finalScoreName.innerText = player.name;
        resultsGrid.appendChild(finalScoreName);
        const finalScorePoints = document.createElement('div');
        finalScorePoints.innerText = player.points;
        resultsGrid.appendChild(finalScorePoints);
    }
})

//Contains the code to 
function playRound() {
    const tournamentPairings = document.createElement('div');
    handleNewRoundGui(tournamentPairings);
    let boardNumber = 1; //Current board number
    const allPlayersCopy = [...allPlayers]; //Creates a duplicate of allPlayers
    let numPlayers = allPlayersCopy.length;
    shuffle(allPlayersCopy); //Shuffles the players into a random order
    allPlayersCopy.sort((a,b) => { return a.points - b.points}); //sorts the players pointwise lowest to highest
    //for loop begins at highest index for efficiency (popping versus shifting)
    for (let i = numPlayers-1; i >= 0; i--) {
        while(allPlayersCopy.length > 1) {
            let newBoard = document.createElement('div');
            newBoard.innerText = `Board # ${boardNumber}`;
            newBoard.winner = "None"; //Keeps track of which player is the winner of that board(or draw)
            
            //Assigns white to a player
            let white = document.createElement('div');
            white.innerText = allPlayersCopy.pop().name;
            let whiteButton = document.createElement('button');
            whiteButton.innerText = white.innerText;
            
            whiteButton.addEventListener('click', (e) => {
                e.preventDefault();
                //No button has been clicked yet
                if (newBoard.winner === 'None') {
                    newBoard.winner = 'white';
                    editPoints(white.innerText, 1);
                }
                //The black player has previously been selected as the winner
                else if (newBoard.winner === 'black'){
                    editPoints(black.innerText, -1);
                    editPoints(white.innerText, 1);
                    newBoard.winner = 'white';
                }
                //The previous selected result was a draw
                else {
                    editPoints(white.innerText, .5);
                    editPoints(black.innerText, -.5);
                    newBoard.winner = 'white';
                }    
                whiteButton.style.backgroundColor='#32CD32';
                blackButton.style.backgroundColor='gray';
                drawButton.style.backgroundColor='gray';
                blackButton.style.color = 'black';
                drawButton.style.color = 'black';
                whiteButton.style.color='white';   
            })

            //same logic as above for black win
            let black = document.createElement('div');
            black.innerText = allPlayersCopy.pop().name;
            let blackButton = document.createElement('button');
            blackButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (newBoard.winner === 'None') {
                    newBoard.winner = 'black';
                    editPoints(black.innerText, 1);
                }
                else if (newBoard.winner === 'white'){
                    editPoints(white.innerText, -1);
                    editPoints(black.innerText, 1);
                    newBoard.winner = 'black'
                }
                else {
                    editPoints(black.innerText, .5);
                    editPoints(white.innerText, -.5);
                    newBoard.winner = 'black';
                }   
                blackButton.style.backgroundColor='#32CD32';
                whiteButton.style.backgroundColor='gray';
                drawButton.style.backgroundColor='gray';
                whiteButton.style.color = 'black';
                drawButton.style.color = 'black';
                blackButton.style.color='white';
            })
            blackButton.innerText = black.innerText;

            //same logic as other two buttons
            let drawButton = document.createElement('button');
            drawButton.innerText = 'Draw';
            drawButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (newBoard.winner === 'None') {
                    newBoard.winner = 'draw';
                    editPoints(white.innerText, .5);
                    editPoints(black.innerText, .5);
                }
                else if (newBoard.winner === 'white'){
                    editPoints(white.innerText, -.5);
                    editPoints(black.innerText, .5);
                    newBoard.winner = 'draw'
                }
                else {
                    editPoints(black.innerText, -.5);
                    editPoints(white.innerText, .5);
                    newBoard.winner = 'draw';
                }   
                drawButton.style.backgroundColor='#32CD32';
                whiteButton.style.backgroundColor='gray';
                blackButton.style.backgroundColor='gray';
                whiteButton.style.color = 'black';
                blackButton.style.color = 'black';
                drawButton.style.color='white';
            })

            tournamentPairings.appendChild(newBoard);
            tournamentPairings.appendChild(white);
            tournamentPairings.appendChild(black);
            tournamentPairings.appendChild(whiteButton); 
            tournamentPairings.appendChild(blackButton);
            tournamentPairings.appendChild(drawButton);           
            boardNumber++;
        }
        //Handles an odd number of players; a player with the lowest point value gets a bye and earns a free point
        if (allPlayersCopy.length === 1) {
            const remainingPerson = allPlayersCopy.pop() //The odd player
            let newBoard = document.createElement('div');
            newBoard.innerText = `Bye`;
            let byeRecipient = document.createElement('div');
            byeRecipient.innerText= remainingPerson.name;
            tournamentPairings.appendChild(newBoard);
            tournamentPairings.appendChild(byeRecipient);
            const index = allPlayers.findIndex(player => {
                return remainingPerson.name === player.name});
            allPlayers[index].points++;
        }
    }
    
}

function handleNewRoundGui(tournamentPairings) {
    const newRoundInfo = document.createElement('h4');
    newRoundInfo.classList.add('round-info', 'centered');
    allRounds.appendChild(newRoundInfo);
    newRoundInfo.innerText = `Tournament Pairings: Round # ${roundNum}`;  

    tournamentPairings.classList.add('tournament-pairings');
    allRounds.appendChild(tournamentPairings);

    const divBoardNum = document.createElement('div');
    divBoardNum.classList.add('bold');
    tournamentPairings.appendChild(divBoardNum);

    const divWhite = document.createElement('div');
    divWhite.classList.add('bold');
    tournamentPairings.appendChild(divWhite);

    const divBlack = document.createElement('div');
    divBlack.classList.add('bold');
    tournamentPairings.appendChild(divBlack);

    const divWhiteWinner = document.createElement('div');
    divWhiteWinner.classList.add('bold');
    tournamentPairings.appendChild(divWhiteWinner);

    const divBlackWinner = document.createElement('div');
    divBlackWinner.classList.add('bold');
    tournamentPairings.appendChild(divBlackWinner);

    const divDraw = document.createElement('div');
    divDraw.classList.add('bold');
    tournamentPairings.appendChild(divDraw);

    const breakage = document.createElement('br');
    allRounds.appendChild(breakage);

    const hr2 = document.createElement('hr');
    allRounds.appendChild(hr2);
}


console.log("FINAL RESULTS:", allPlayers);

function editPoints(name, amount) {
    let targetedPlayer = allPlayers.find(player => player.name === name);
    targetedPlayer.points += amount;
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
