let score = JSON.parse(localStorage.
    getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
    };

function pickComputerMove() {
    const randomNum = Math.random();

    let computerMove = '';

    if (randomNum >= 0 && randomNum < 1 / 3) {
        computerMove = 'rock';
    }
    if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
        computerMove = 'paper';
    }
    if (randomNum >= 2 / 3 && randomNum < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

function play(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';
    let playerIcon = '';
    let computerIcon = '';

    if (playerMove === 'rock') {
        playerIcon = '✊';
        if (computerMove === 'rock') {
            computerIcon = '✊';
            result = 'tie';
        }else if (computerMove === 'paper') {
            computerIcon = '✋';
            result = 'win';
        }else if (computerMove === 'scissors') {
            computerIcon = '✌️';
            result = 'loss';
        }
    }else if (playerMove === 'paper') {
        playerIcon = '✋';
        if (computerMove === 'rock') {
            computerIcon = '✊';
            result = 'win';
        }else if (computerMove === 'paper') {
            computerIcon = '✋';
            result = 'tie';
        }else if (computerMove === 'scissors') {
            computerIcon = '✌️';
            result = 'loss';
        }
    }else if (playerMove === 'scissors') {
        playerIcon = '✌️';
        if (computerMove === 'rock') {
            computerIcon = '✊';
            result = 'loss';
        }else if (computerMove === 'paper') {
            computerIcon = '✋';
            result = 'win';
        }else if (computerMove === 'scissors') {
            computerIcon = '✌️';
            result = 'tie';
        }

    }

    if(result === 'win'){
        score.wins ++;
    }else if(result === 'loss'){
        score.losses ++;
    }else if(result === 'ties'){
        score.ties ++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScore();

    document.querySelector('.js-result').innerHTML = 
        `<p>${playerIcon} vs ${computerIcon}</p>
        <p>You ${result}.</p>`;
}

function updateScore(){
    document.querySelector('.js-statistics').innerHTML = 
        `wins: ${score.wins} losses: ${score.losses} ties: ${score.ties}`;    
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        play(playerMove);
    }, 1000);  
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }  
}