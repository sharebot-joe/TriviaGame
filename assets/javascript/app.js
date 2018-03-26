$('.button, .framemiddle').css('display','none');  //temp hiding buttons

$(document).ready(function() {

	var correct = 0;
	var incorrect = 0;

	var arr = [
		['Who is the Sonics\' all-time leading scorer?','Gary Payton',['Shawn Kemp', 'Kevin Durant', 'Ray Allen'], 'Payton, who scored 18,207 points in his Sonics career, received his popular nickname \'The Glove\' in 1993 when his cousin phoned him during the week of the Western Conference Finals against Phoenix and told him “You’re holding Kevin Johnson like a baseball in a glove'],
		['What is the name of the SuperSonics\' beloved furry mascot?','Squatch', ['Hooper', 'Boomer', 'Grizz',], 'In 2007, Squatch attempted to set a world record with a jump of 30 feet on inline skates, over vehicles owned by NBA players Ray Allen and Robert Swift.'],
		['Who was the SuperSonics\' long-time play-by-play announcer from 1987 to 2008?', 'Kevin Calabro', ['Marv Albert', 'Mike Breen', 'Brent Barry'], 'Calabro\'s first color announcer partner was Rick Barry, an NBA legend who in 1996 was named one of the 50 Greatest Players in NBA history.']
	];
		
	var randomArr = [];

	// function getRandomInt(min, max) {
	//   return Math.floor(Math.random() * (max - min + 1) + min);
	// }

	// function showRandomNumber () {
	// 	randomNumber = getRandomInt(19, 120)
	// 	$('.targetnum').html(randomNumber)

	// }

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

	function hideIntro() {
		$('#introimage').hide();
		$('.clickme').hide();
	}
	function countdown() {
		var count=11;
		var counter=setInterval(timer, 1000); 

		//Alternate form using for loop
		// for (i = index; i > 0; i--) {
		// 	setTimeout(function() {
		//     console.log("inside setinterval" + i)
		// 		$('.frametop').html('<div>' + i + '</div>')
		//   }, 1000);	
		// }
		function timer()
		{
		  count=count-1;
		  if (count <= 0)
		  {
		     clearInterval(counter);
		     //counter ended, do something here
		     return;
		  }
		  if (count <= 8)
		  {
		     $('.timeremaining').css({ 'color': 'red' })
		  }
		  if (count <= 3)
		  {
		     $('.timeremaining').fadeIn(175).fadeOut(175).fadeIn(175).fadeOut(175).fadeIn(175).fadeOut(175).fadeIn(175).fadeOut(175).fadeIn(175);
		  }
	  	$('.timeremaining').html(count + " seconds")
		  // Alternate: document.getElementById("timer").innerHTML="count + " secs""; 
		}
	}
	Array.prototype.pushArray = function() {
    var toPush = this.concat.apply([], arguments);
    for (var i = 0, len = toPush.length; i < len; ++i) {
        this.push(toPush[i]);
    }
	};


	function runGame () {
			
		randomArr = shuffle(arr);
		var numQuestions = randomArr.length;
		console.log(randomArr)
		console.log(numQuestions)
		$('.framemiddle').css('display','block');
		for (i= 0; i < numQuestions; i++) {
			showQuestion(i);
			// var answer = $('.button').on('click', function() {
			// 	var isCorrect = false;
			// 	value = $(this).text();
			// 	console.log(value)
			// 	if (value === randomArr[index][1]) {
			// 		isCorrect = true;
			// 	}
			// 	isCorrect ? correct++ : incorrect++;
			// 	// isCorrect ? add borders aroudn correct answer boxes
			// 	isCorrect ? $('.framemiddle').html('Yes! The correct answer is ' + value + '.') : $('.framemiddle').html('Wrong! The correct answer is ' + value + '.');
			// 	$('.framemiddle').append('<img src="assets/images/"' + randomArr[index][4] + '"');
			// 	$('.framemiddle').append('<div>' + randomArr[index][3] + '</div>');
			// 	setTimeout(function(){return true;},5000);
			// 	// isCorrect ? add borders aroudn correct answer boxes
			// });
		}
		
	}

	function showQuestion(index) {
		var question = randomArr[index][0];
		$('.framemiddle').html(question); // displaying question

		// preparing buttons
		var answerChoices = [];
		answerChoices.push(randomArr[index][1]);
		answerChoices.pushArray(randomArr[index][2]);
		answerChoices = shuffle(answerChoices);
		var numChoices = answerChoices.length;

		console.log(answerChoices)
		$('.button').css('display', 'table-cell'); // displaying buttons

		for (i=0; i < numChoices; i++) {
			$('.option-' + i).html(answerChoices[i]); // displaying button choices
		}
		$('.button').bind('click', function() {
			var isCorrect = false;

			//extracting text value from button
			var value = $(this).text();
			console.log(value)

			// Checking for correct answer
			var isCorrect = false;
			if (value === randomArr[index][1]) {
				isCorrect = true;
			}

			fadeWrongAnswers(index, numChoices);

			isCorrect ? correct++ : incorrect++;  // compute scores
			
			isCorrect ? $('.framemiddle').html('Yes! The correct answer is ' + value + '.') : $('.framemiddle').html('Wrong! The correct answer is ' + randomArr[index][1] + '.');
			$('.framemiddle').append('<img src="assets/images/"' + randomArr[index][4] + '"');
			$('.framemiddle').append('<div>' + randomArr[index][3] + '</div>');
			setTimeout(function(){return true;},5000);
		});
	}

	// Setting transparency on wrong answers
	function fadeWrongAnswers(index, number) {
		for (i=0; i < number; i++) {
			console.log(randomArr[index][1])
			var value = $('.option-' + i).text()
			console.log(value)
			if ($('.option-' + i).value !== randomArr[index][1]) {
				$('.option-' + i).css('opacity', '.3');
			}
				
		}
	}

	// $('.button').on('click', function(index) {
	// 	var isCorrect = false;


	// 	var index = this.indexOf()
	// 	if (value === randomArr[index][1]) {
	// 		isCorrect = true;
	// 		console.log(isCorrect)
	// 	}
	// 	// isCorrect ? correct++ : incorrect++;
	// 	// // isCorrect ? add borders aroudn correct answer boxes
	// 	// isCorrect ? $('.framemiddle').html('Yes! The correct answer is ' + value + '.') : $('.framemiddle').html('Wrong! The correct answer is ' + value + '.');
	// 	// $('.framemiddle').append('<img src="assets/images/"' + randomArr[index][4] + '"');
	// 	// $('.framemiddle').append('<div>' + randomArr[index][3] + '</div>');
	// 	// setTimeout(function(){return true;},5000);
	// 	// // isCorrect ? add borders aroudn correct answer boxes
	// });

	// // Run main program
	$('#introimage').one('click', function() {

	hideIntro();
	countdown();
	runGame();

	});
	
//document ready
});	
