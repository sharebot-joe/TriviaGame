$('.button, .framemiddle').css('display','none');  //temp hiding buttons

$(document).ready(function() {

	var correct = '';
	var incorrect = '';

	var arr = [
		['Who is the Sonics\' all-time leading scorer?','Gary Payton',['Shawn Kemp', 'Kevin Durant', 'Ray Allen'], 'Payton, who scored 18,207 points in his Sonics career, received his popular nickname "The Glove" in 1993 when his cousin phoned him during the week of the Western Conference Finals against Phoenix and told him, "You\'re holding Kevin Johnson like a baseball in a glove"', 'payton.jpg'],
		['What is the name of the SuperSonics\' beloved furry mascot?','Squatch', ['Hooper', 'Boomer', 'Grizz',], 'In 2007, Squatch attempted to set a world record with a jump of 30 feet on inline skates, over vehicles owned by NBA players Ray Allen and Robert Swift.', 'squatch.jpg'],
		['Who was the SuperSonics\' long-time play-by-play announcer from 1987 to 2008?', 'Kevin Calabro', ['Marv Albert', 'Mike Breen', 'Brent Barry'], 'Calabro\'s first color announcer partner was Rick Barry, an NBA legend who in 1996 was named one of the 50 Greatest Players in NBA history.', 'calabro.jpg']
		// ['Who was the first Seattle SuperSonics player to be named MVP of the NBA All-Star Game?', 'Lenny Wilkens', ['Shawn Kemp', 'Gary Payton', 'Tom Chambers'], 'After retiring as a player, Wilkens was the head coach in Seattle for eight seasons (1977–1985), winning his (and Seattle\'s) only NBA championship in 1979.', 'wilkens.jpg'],
		// ['Which Seattle Sonics player had the nickname "Downtown"?', 'Fred Brown', ['Spencer Haywood', 'Desmond Mason', 'Hersey Hawkins'], 'Often among the league leaders in free-throw percentage, Brown also led the NBA in three-point shooting percentage in 1979–80 — the first season in which the three-point line was adopted by the league.', 'brown.jpg']
		// ['The Seattle SuperSonics originally played in which arena?', 'Seattle Center Coliseum', ['Kingdome', 'Key Arena', 'Tacoma Dome'], 'The Beatles performed at the Coliseum on Aug. 21, 1964 in front of 14,300 screaming fans. Tickets: $5.', 'coliseum.jpg'],
		// ['Who was not a part of the Seattle Sonics\' "Big Three" in the late 1980\'s?', 'Nate McMillan', ['Xavier McDaniel', 'Dale Ellis', 'Tom Chambers'], 'McMillan was known for his superb defense, leading the NBA in steals per game for the 1993–94 season and being named to the NBA All-Defensive Second Team for the 1993–94 and 1994–95 seasons.', 'mcmillan.jpg'],
		// ['Which Seattle Sonics player did not make the 1995 NBA All-Star Game?', 'Kendall Gill', ['Shawn Kemp', 'Gary Payton', 'Detlef Schrempf'], 'Gill was chosen in the 1990 NBA draft as the fifth overall pick by the Charlotte Hornets, and was named First Team All-Rookie for the 1990–91 season.', 'gill.jpg'],
		// ['In what year did the Seattle SuperSonics win their first NBA championship?', '1979', ['1976', '1980', '1978'], 'This was Seattle\'s first professional sports championship since the Seattle Metropolitans\' victory in the Stanley Cup in 1917.', '1979.jpg'],
		// ['Which Seattle Sonics player had the nickname "Big Smooth"?', 'Sam Perkins', ['Frank Brickowski', 'Vin Baker', 'Dale Ellis'], 'A teammate of future Hall of Famers James Worthy and Michael Jordan on the \'82 NCAA Championship Team, Perkins was a three-time All-American, three-time First Team All-ACC, and 1984 USA Basketball Male Athlete of the Year.', 'perkins.jpg']
	];
	var numQuestions = arr.length;	
	var randomArr = [];

	var intervalHandle = null;
	var blinking = null;
	var questionIndex = '';
	var answerChoices = [];


	function hideIntro() {
		$('#introimage').hide();
		$('.clickme').hide();
	}
	function countdown() {
		var count=6;
		$('.timeremaining').html(count + " seconds")
		intervalHandle=setInterval(timer, 1000); 
	
		function timer()
		{
		  if (count <= 8)
		  {
		     $('.timeremaining').css({ 'color': 'red' })
		  }
		  if (count <= 3)
		  {
		     blinking = setInterval(function(){ $('.timeremaining').fadeIn(175).fadeOut(175); }, 0);	
		     // $('.timeremaining').fadeIn(175).fadeOut(175).fadeIn(175).fadeOut(175).fadeIn(175).fadeOut(175).fadeIn(175).fadeOut(175).fadeIn(175);
		  }
		  if (count <= 0)
		  {
		   	clearInterval(blinking);
		   	clearInterval(intervalHandle);

		    //counter ended, do something here;
				processUnanswered();
				
				if (questionIndex > (numQuestions - 1)) {
					showResults();
					setTimeout(function() { runGame(); }, 5000);
					
				} else {
					setTimeout(function(){ showQuestion(questionIndex); }, 5000);	
				}

		    return;
		  }
	  	$('.timeremaining').html(count + " seconds")
		  count=count-1; 
		}
		
	}

	function processUnanswered() {
		incorrect++;  
		resultMsg = $('.framemiddle').html('The correct answer is ' + randomArr[questionIndex][1] + '.'); // Display result msg
		$('.framemiddle').append('<img src="assets/images/"' + randomArr[questionIndex][4] + '"'); // Display img
		$('.framemiddle').append('<div class="factoid">' + randomArr[questionIndex][3] + '</div>'); // Display factoid
		$('.factoid').css({"margin-top": "20px", "font-size": "1rem"});
		fadeWrongAnswers();
		answerChoices = [];
		questionIndex++
	}

	//Function that takes in an array and returns a new array with the same elements shuffled. 
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

	Array.prototype.pushArray = function() {
    var toPush = this.concat.apply([], arguments);
    for (var i = 0, len = toPush.length; i < len; ++i) {
        this.push(toPush[i]);
    }
	};


	

	function showResults() {
		$('.finalresults').append('<div>Correct: ' + correct + '</div>')
		$('.finalresults').append('<div>Incorrect: ' + incorrect + '</div>')
		$('.finalresults').append('<div>Unanswered: ' + (numQuestions - correct - incorrect))
	}


	function showCorrect() {
		correct++
		resultMsg = $('.framemiddle').html('Yes! The correct answer is ' + randomArr[questionIndex][1] + '.')
	}
	function showIncorrect() {
		incorrect++
		resultMsg = $('.framemiddle').html('Wrong! The correct answer is ' + randomArr[questionIndex][1] + '.');
	}

	// Setting transparency on wrong answers
	function fadeWrongAnswers() {
		var answer = (randomArr[questionIndex][1])
		console.log(answer)
		for (i=0; i < answerChoices.length; i++) {
			var value = $('.option-' + i).text()
			console.log(value)

			// Fading only incorrect answers
			if (answer !== value) {
				$('.option-' + i).css('opacity', '.3');
			}
		}
	}
	function showQuestion(index) {
		var question = randomArr[index][0];
		$('.framemiddle').html(question); 
	}
	function showButtons(index) {
		answerChoices.push(randomArr[index][1]);
		answerChoices.pushArray(randomArr[index][2]);
		answerChoices = shuffle(answerChoices);
		var numChoices = answerChoices.length;
		$('.button').css({'display': 'table-cell', 'opacity': '1'}); // displaying buttons

		for (i=0; i < numChoices; i++) {
			$('.option-' + i).html(answerChoices[i]); // Populating answers
		}
	}
		
		

	// Binding click events
	clickHandlers = $('.button').bind('click', function() {

		// Stopping countdown
		clearInterval(intervalHandle);
		clearInterval(blinking);

		//extracting text value from button
		var value = $(this).text();

		// Checking for correct answer
		var isCorrect = false;
		if (value === randomArr[questionIndex][1]) {
			isCorrect = true;
		}

		// Displaying result msg
		if (isCorrect) {
			showCorrect()
		} else {
			showIncorrect()
		}
		
		$('.framemiddle').append('<img src="assets/images/"' + randomArr[questionIndex][4] + '"'); // Display result img
		$('.framemiddle').append('<div class="factoid">' + randomArr[questionIndex][3] + '</div>'); // Display result factoid
		$('.factoid').css({"margin-top": "20px", "font-size": "1rem"});
		
		fadeWrongAnswers();
		// Unbind click handlers
		$('.button').unbind();
		
		answerChoices = [];
		questionIndex++

		if (questionIndex > (numQuestions - 1)) {
			showResults();
			setTimeout(function() { runGame(); }, 5000);
		} else {
			setTimeout(function(){ showQuestion(questionIndex); }, 3000);
		}
	});
	console.log('ShowQuestion Complete')
		
	}

	function initializeGame () {
		$('.finalresults').empty();  // Hiding finalresults
		$('.framemiddle').css('display','block');
		randomArr = shuffle(arr);
		questionIndex = 0;
		correct = 0;
		incorrect = 0;
	}
	function runGame () {
		initializeGame();
		showQuestion(questionIndex);
		showButtons(questionIndex);
		countdown(); // Start timer
		// 
		// // event = onclick event (function () {
		// 	if questionIndex < numQuestions
		// 		get value of clicked button

		// 		if correct 
		// 			process correct
		// 		if incorrect
		// 			process incorrect
		// 		if timer runs out
		// 			process unanswered
		//   else if questionIndex > numQuestions
		//   	endGame()
		//   	resetButton()
		// }	
	}

	// // Run main program
	$('#introimage').one('click', function() {

		hideIntro();
		runGame();

	});
	
//document ready
});	
