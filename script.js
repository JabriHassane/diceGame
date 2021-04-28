//declaration of varibales :
var score, roundScores, activePlayer, gamePlaying;
init();

//DOM manipulation

//add event listeners
document.querySelector('.btn--roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. git a random number for the dice
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = '/images/dice-' + dice + '.png';

        //3.update the round score If the result was not a 1
        if (dice !== 1) {
            //Add score
            roundScores += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScores;
        } else {
            nextPlayer();
        }
    }
});

//Hold the score
document.querySelector('.btn--hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add the current score to the globale score
        score[activePlayer] += roundScores;

        //Update the UI
        document.querySelector('#score--' + activePlayer).textContent = score[activePlayer];

        //check if the player won the game
        if (score[activePlayer] >= 20) {
            document.querySelector('#name--' + activePlayer).textContent = 'WINNER !';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next Player
    activePlayer = activePlayer === 0 ? 1 : 0;
    //set the current score to 0
    roundScores = 0;
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';


    //Set the active player in the HTML document
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    //haid the dice
    document.querySelector('.dice').style.display = 'none';
    console.log('Im here');
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {

    //intialize the varibales
    score = [0, 0];
    roundScores = 0;
    activePlayer = 0;

    //reset the game
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    //change the CSS style
    document.querySelector('.dice').style.display = 'none';
}