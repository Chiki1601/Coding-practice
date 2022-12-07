//Ready Function
var ready = function ( fn ) {
	if ( typeof fn !== 'function' ) return;
	if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
			return fn();
	}
	document.addEventListener( 'DOMContentLoaded', fn, false );
};

var memoryGame = (function() {
	// Initialize variables
	var gameContainer = document.querySelector('.game-container');
	var cardContainer = document.querySelector('.cards');
	var allCards = document.querySelectorAll('.card');
	var winnerName = document.querySelector('.winnerName');
	var restartButtons = document.querySelectorAll('.restartGame');

	var player1Win_count = document.querySelector('.winnerColumn .player1_profile h2 span');
	var player2Win_count = document.querySelector('.winnerColumn .player2_profile h2 span');

	var roundsDiv = document.querySelector('.rounds');
	var matchedCards = 0;
	var turn = 1;
	var rounds = 1;
	var player1 = {
		string: 'player1',
		points: 0,
		val1: '',
		val2: '',
		wins: 0
	}
	var player2 = {
		string: 'player2',
		points: 0,
		val1: '',
		val2: '',
		wins: 0
	}
	var cardItems = ['silvercoin', 'yellowcoin', 'mushroom', 'greenmushroom', 'fireflower', 'iceflower', 'star', 'leaf', 'yoshi'];

	//duplicate items in array
	var dupCards = cardItems.map(function(item) {
    return [item, item];
	}).reduce(function(a, b) { return a.concat(b) });

	//Randomize Cards
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	//chunk Random Arrar
	function chunkArray(myArray, chunk_size){
		var index = 0;
		var arrayLength = myArray.length;
		var tempArray = [];
		for (index = 0; index < arrayLength; index += chunk_size) {
			myChunk = myArray.slice(index, index+chunk_size);
			// Do something if you want with the group
			tempArray.push(myChunk);
		}
		return tempArray;
	}
	
	// Add Events when Dom ready
	ready(function() {

		//Init Game
		startGame();
		//Turns
		cardContainer.classList.add('player1-turn');
		//Restart Event Handler
		for(let b = 0; b < restartButtons.length; b ++ ) {
			restartButtons[b].addEventListener('click', function(){
				// console.log('button clicked');
				reStart();
				setTimeout(function(){
					startGame();
				}, 700);
			})
		}

		//Points Function
		function points(player, card, color) {
			//Have to add new variable for all cards?
			var allCards = document.querySelectorAll('.card');
			//switch statement
			if(player.val1 === '' ){
				player.val1 = card.dataset.cardType;
				// console.log(player.val1);
			} else if(player.val2 === '' ){
				player.val2 = card.dataset.cardType;
				// console.log(player.val2);
	
				if(player.val1 === player.val2) {
					matchedCards += 2;
					player.points += 1;
					setTimeout(function(){
						document.querySelector('.'+ player.string +'-pts').innerHTML = player.points;
						for(let y = 0; y < allCards.length; y ++ ){	
							if(allCards[y].classList.contains('reveal')){
								allCards[y].classList.add(color);
								allCards[y].classList.add('match');
								// console.log('made a match');
							}
						}					
					}, 700);
					if(matchedCards === dupCards.length) {
						gameEnds();
					}
					player.val1 = player.val2 = '';
				} else {
					player.val1 = player.val2 = '';
					setTimeout(function(){
						for(let n = 0; n < allCards.length; n ++ ){
							allCards[n].classList.remove('reveal');
						}
						if(player === player1){
							turn = 2;
							cardContainer.classList.remove('player1-turn');
							cardContainer.classList.add('player2-turn');
						} else {
							turn = 1;
							cardContainer.classList.remove('player2-turn');
							cardContainer.classList.add('player1-turn');
						}
					}, 700);
	
				}
			} else {
				// console.log('nothing');
			}
		}

		//Start Game
		function startGame() {
			roundsDiv.innerHTML = rounds;
			var randomArray = shuffle(dupCards);
			var chunkedArray = chunkArray(randomArray, 6);
			//Print Cards
			cardContainer.innerHTML = '';
			var output = document.createDocumentFragment();
			for(let i = 0; i < chunkedArray.length; i++) {
				tr = document.createElement('tr');
				for(let n = 0; n < chunkedArray[i].length; n++ ) {
					//Print td content
					tr.innerHTML += `<td><div class="card" data-card-type="`+ chunkedArray[i][n] + `"><div class="card-front"><div class="card-image" ></div></div><div class="card-back"></div></div></td>`;
					//Add tr to output
					output.appendChild(tr);
				}
			}
			cardContainer.appendChild(output);
			//CLICK EVENT -- change for event delegation (when document is ready)
			var cards = document.querySelectorAll('.card');
			for(let i = 0; i < cards.length; i ++ ) {
				cards[i].addEventListener('click', function() {
					cards[i].classList.toggle('reveal');
					if(turn === 1) {
						points(player1, cards[i], 'red');
					} else {
						points(player2, cards[i], 'blue');
					}
				})
			}
		}

		//Restart Game
		function reStart(){
			var allCards = document.querySelectorAll('.card');
			if( matchedCards === dupCards.length ) {
				rounds += 1;
			}
			//reset matched cards
			matchedCards = 0;
			//reset player points
			player1.points = player2.points = 0;
			document.querySelector('.player1-pts').innerHTML = player1.points;
			document.querySelector('.player2-pts').innerHTML = player2.points;
			//reset player values
			player1.val1 = player2.val1 = player1.val2 = player2.val2 = '';
			//Remove reveal classes
			for(let y = 0; y < allCards.length; y ++ ) {	
				if( allCards[y].classList.contains('reveal','match') ){
					allCards[y].classList.remove('match');
					allCards[y].classList.remove('reveal');
				}
			}
			//close modal/remove winner classes
			if( gameContainer.classList.contains('endGame') ){
				gameContainer.classList.remove('endGame');
				gameContainer.classList.remove('player1-wins','player2-wins');
			}	
		}

		//Game Over 
		function gameEnds() {
			gameContainer.classList.add('endGame');
			if(player1.points > player2.points) {
				gameContainer.classList.add('player1-wins');
				winnerName.innerHTML = 'Mario Wins!';
				player1.wins += 1;
				player1Win_count.innerHTML = player1.wins;
			} else {
				gameContainer.classList.add('player2-wins');
				winnerName.innerHTML = 'Luigi Wins!';
				player2.wins += 1;
				player2Win_count.innerHTML = player2.wins;
			}
		}

	});

})();
