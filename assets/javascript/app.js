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

	var blinkInterval = null;
	var questionIndex = '';
	var answerChoices = [];
	var resultMsg = '';
	var count='';
	var secondsInterval=null;

	// Run main program
	$('#introimage').one('click', function() {
		hideIntro();
		runGame();
	});

	function hideIntro() {
		$('#introimage').hide();
		$('.clickme').hide();
	}

	function runGame() {
		initializeGame();
		secondsInterval=setInterval(timer, 1000);
		showQuestion(questionIndex);
		showButtons(questionIndex);

	}

	function initializeGame() {
		$('.finalresults').empty();  // Hiding finalresults
		randomArr = shuffle(arr);
		questionIndex = 0;
		correct = 0;
		incorrect = 0;
		count=7;
	}

	function showQuestion(index) {
		$('#timeremaining').html(count + " seconds") //visual placeholder
		$('.button, .framemiddle').css('display','block');
		var question = randomArr[index][0];
		$('.framemiddle').html(question); 
		
	}

	function showButtons(index) {
		answerChoices.push(randomArr[index][1]);
		answerChoices.pushArray(randomArr[index][2]);
		answerChoices = shuffle(answerChoices);
		
		$('.button').css({'display': 'table-cell', 'opacity': '1'}); // displaying buttons

		var numChoices = answerChoices.length;
		for (i=0; i < numChoices; i++) {
			$('.option-' + i).html(answerChoices[i]); // Populating answers
		}

		$('.button').on('click', buttonClick);
	}

	function timer() 
	{
		clearInterval(blinkInterval);
		$('#timeremaining').html(count + " seconds")

	  if (count <= 0)
	  {
	   	clearInterval(secondsInterval);

	    //counter ended, do something here;
	    // $('.button').off(buttonClick);
	    // buttonClick.unbind();
			processUnanswered();
			if (questionIndex + 1 === numQuestions) { // Unanswered question with none remaining
				
				showResults();
				count = 7
				setTimeout(runGame, 5000);
				
			} else { // Unaswered question with more remaining
				questionIndex++
				count = 7
				setTimeout(function() { 
					showQuestion(questionIndex);
					showButtons(questionIndex);
					$('button').on("click", buttonClick);	
				}, 5000);	
			}

	  //   return;
	  }
  	else if (count <= 3)
	  {
	    blinkInterval = setIntervalX(function(){ 
		    	$('#timeremaining').fadeOut(160).fadeIn(160); 
			  }, 0, 3);	
	  }
	  else if (count <= 6)
	  {
	     $('#timeremaining').css({ 'color': 'red' })
	  }
	  count=count-1; 
	}

	function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
	}
	
	
		
function processUnanswered() {
		incorrect++;  
		resultMsg = $('.framemiddle').html('The correct answer is ' + randomArr[questionIndex][1] + '.'); // Display result msg
		showImage();
		showFactoid();
		fadeWrongAnswers();
		answerChoices = [];
}

	// Binding click events

	// var buttonClick = $('.button').on('click', function() {
		


	function buttonClick () {
		// Stopping countdown
		clearInterval(secondsInterval);
		clearInterval(blinkInterval);

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
		// buttonClick.unbind();
		// $('button').off("click", buttonClick);
		// $(buttonClick).off();
		// $('.button').off(buttonClick);
		showImage();
		showFactoid();
		fadeWrongAnswers();
		
		answerChoices = [];
		questionIndex++

		count = 7;

		if (questionIndex > (numQuestions - 1)) {
			showResults();
			setTimeout(runGame, 5000);
		} else {
			setTimeout(function(){  
				secondsInterval=setInterval(timer, 1000);
				showQuestion(questionIndex);
				showButtons(questionIndex);
			}, 3000); 		
		}
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
		resultMsg = $('.framemiddle').html('Yes! The correct answer is ' + randomArr[questionIndex][1] + '.');  // 'Correct' message
	}

	function showIncorrect() {
		incorrect++
		resultMsg = $('.framemiddle').html('Wrong! The correct answer is ' + randomArr[questionIndex][1] + '.');
	}

	function showImage() {
		$('.framemiddle').prepend('<img id="img" class="img-fluid" src="assets/images/' + randomArr[questionIndex][4] + '" />');  // displaying image
		$('#img').css({'display': 'block' , 'margin-bottom' : '30px', 'max-width': '100%;', 'height': 'auto'})  //styling image
	}

	function showFactoid() {
		$('.framemiddle').append('<div class="factoid">' + randomArr[questionIndex][3] + '</div>'); // Display result factoid
		$('.factoid').css({"margin-top": "20px", "font-size": "1rem"});
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
	
//document ready
});	
