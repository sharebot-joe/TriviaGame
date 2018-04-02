$('.button, .framemiddle, .restart').css('display', 'none'); //temp hiding buttons
$(document).ready(function() {
  var correct = '0';
  var incorrect = '0';
  var unanswered = '0';
  var arr = [
    ['Who is the Sonics\' all-time leading scorer?', 'Gary Payton', ['Shawn Kemp', 'Kevin Durant', 'Ray Allen'], 'Payton, who scored 18,207 points in his Sonics career, received his popular nickname "The Glove" in 1993 when his cousin phoned him during the week of the Western Conference Finals against Phoenix and told him, "You\'re holding Kevin Johnson like a baseball in a glove"', 'payton.jpg'],
    ['What is the name of the SuperSonics\' beloved furry mascot?', 'Squatch', ['Hooper', 'Boomer', 'Grizz'], 'In 2007, Squatch attempted to set a world record with a jump of 30 feet on inline skates, over vehicles owned by NBA players Ray Allen and Robert Swift.', 'squatch.jpg'],
    ['Who was the SuperSonics\' long-time play-by-play announcer from 1987 to 2008?', 'Kevin Calabro', ['Marv Albert', 'Mike Breen', 'Brent Barry'], 'Calabro\'s first color announcer partner was Rick Barry, an NBA legend who in 1996 was named one of the 50 Greatest Players in NBA history.', 'calabro.jpg'],
    ['Who was the first Seattle SuperSonics player to be named MVP of the NBA All-Star Game?', 'Lenny Wilkens', ['Shawn Kemp', 'Gary Payton', 'Tom Chambers'], 'After retiring as a player, Wilkens was the head coach in Seattle for eight seasons (1977–1985), winning his (and Seattle\'s) only NBA championship in 1979.', 'wilkens.jpg'],
    ['Which Seattle Sonics player had the nickname "Downtown"?', 'Fred Brown', ['Spencer Haywood', 'Desmond Mason', 'Hersey Hawkins'], 'Often among the league leaders in free-throw percentage, Brown also led the NBA in three-point shooting percentage in 1979–80 — the first season in which the three-point line was adopted by the league.', 'brown.jpg'],
    ['The Seattle SuperSonics originally played in which arena?', 'Seattle Center Coliseum', ['Kingdome', 'Key Arena', 'Tacoma Dome'], 'The Beatles performed at the Coliseum on Aug. 21, 1964 in front of 14,300 screaming fans. Tickets: $5.', 'coliseum.jpg'],
    ['Who was not a part of the Seattle Sonics\' \"Big Three\" in the late 1980\'s?', 'Nate McMillan', ['Xavier McDaniel', 'Dale Ellis', 'Tom Chambers'], 'McMillan was known for his superb defense, leading the NBA in steals per game for the 1993–94 season and being named to the NBA All-Defensive Second Team for the 1993–94 and 1994–95 seasons.', 'mcmillan.jpg'],
    ['Which Seattle Sonics player did not make the 1995 NBA All-Star Game?', 'Kendall Gill', ['Shawn Kemp', 'Gary Payton', 'Detlef Schrempf'], 'Gill was chosen in the 1990 NBA draft as the fifth overall pick by the Charlotte Hornets, and was named First Team All-Rookie for the 1990–91 season.', 'gill.jpg'],
    ['In what year did the Seattle SuperSonics win their first NBA championship?', '1979', ['1976', '1980', '1978'], 'This was Seattle\'s first professional sports championship since the Seattle Metropolitans\' victory in the Stanley Cup in 1917.', '1979.jpg'],
    ['Which Seattle Sonics player had the nickname "Big Smooth"?', 'Sam Perkins', ['Frank Brickowski', 'Vin Baker', 'Dale Ellis'], 'A teammate of future Hall of Famers James Worthy and Michael Jordan on the \'82 NCAA Championship Team, Perkins was a three-time All-American, three-time First Team All-ACC, and 1984 USA Basketball Male Athlete of the Year.', 'perkins.jpg']
  ];
  var numQuestions = arr.length;
  var randomArr = [];
  var questionIndex = 0;
  var answerChoices = [];
  var resultMsg = '';
  var count;
  var blinkInterval;
  var secondsInterval;
  var buttons = $('.button');

  // Run main program
  $('#introimage').one('click', function() {
    hideIntro();
    runGame();
  });

  function hideIntro() {
    $('#introimage').hide();
    $('.clickme').hide();
    $('.restart').hide();
  }

  function runGame() {
    initializeGame();
    showQuestion(questionIndex);
    showButtons(questionIndex);
  }

  function initializeGame() {
    $('.finalresults').html(''); 
    $('#timeremaining').html('');
    $('.restart').hide();
    randomArr = shuffle(arr);
    questionIndex = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    count = 20;
    clearInterval(secondsInterval)
    clearInterval(blinkInterval)
  }
  //Function that takes in an array and returns a new array with the same elements shuffled. 
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a
  }
  //Function that pushes an entire array into another array
  Array.prototype.pushArray = function() {
    var toPush = this.concat.apply([], arguments);
    for (var i = 0, len = toPush.length; i < len; ++i) {
      this.push(toPush[i]);
    }
  };

  function showQuestion(index) {
    $('.button, .framemiddle').css('display', 'block');
    var question = randomArr[index][0];
    $('.framemiddle').html(question);
  }

  function showButtons(index) {
    answerChoices.push(randomArr[index][1]);
    answerChoices.pushArray(randomArr[index][2]);
    answerChoices = shuffle(answerChoices);
    var numChoices = answerChoices.length;
    for (i = 0; i < numChoices; i++) {
      var buttontext = $('.buttontext-' + i).html(answerChoices[i])
    }
    $('.button').css('opacity', '1'); // displaying buttons
    addClickHandlers();
    // console.log('questionIndex: ' + questionIndex)
    // console.log('numQuestions - 1: ' + (numQuestions - 1))
    count = 20
    
    
    $('#timeremaining').css({
        'color': '#296037'
      })
    secondsInterval = setInterval(timer, 1000)
  }


  function timer() {
    clearInterval(blinkInterval);
    if (count <= 0) {  // When countdown reaches zero
      $('#timeremaining').html('Time\'s Up!');
      clearInterval(secondsInterval);
      $('.button').off("click");
      processUnanswered();

      if (questionIndex >= (numQuestions - 1)) { //Check for end game
        showResults();
        $('.restart').show();
        var restart = $('.restart').show();
        restart.on('click', function() {
          runGame()
        })
      } 
      else 
      { 
        var nextQuestion = setTimeout(function() {
          questionIndex++
          showQuestion(questionIndex);
          showButtons(questionIndex);
        }, 10000);
      }
    } else if (count <= 3) {
      blinkInterval = setIntervalX(function() {
        $('#timeremaining').fadeOut(160).fadeIn(160);
      }, 0, 3);
    } else if (count <= 6) {
      $('#timeremaining').css({
        'color': 'red'
      })
    }
    $('#timeremaining').html(count + " seconds");
    count = count - 1;
    console.log('current count: ' + count)
  }

  function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function() {
      callback();
      if (++x === repetitions) {
        window.clearInterval(intervalID);
      }
    }, delay);
  }

  function processUnanswered() {
    unanswered++;
    console.log('unanswered: ' + unanswered)
    resultMsg = $('.framemiddle').html('The correct answer is ' + randomArr[questionIndex][1] + '.'); // Display result msg
    showImage();
    showFactoid();
    fadeWrongAnswers();
    answerChoices = [];
  }
  function addClickHandlers() {

    buttons.on('click', function() {
      clearInterval(secondsInterval);
      clearInterval(blinkInterval);
      buttons.off("click"); // Turning off click handler once player has made a selection
      
      var clickedButtonClass = $(this).attr('class').split(' ')[1];
      // var value = $('.buttontext-' + i).text();
      var clickedButtonValue = $('.' + clickedButtonClass + ' .Centered').text();
      // console.log(clickedButtonClass)
      // console.log(clickedButtonValue)

      // Checking for correct answer
      var isCorrect = false;
      if (clickedButtonValue === randomArr[questionIndex][1]) {
        isCorrect = true;
      }
      console.log(isCorrect)
      // Displaying result msg
      isCorrect ? showCorrect() : showIncorrect()
      showImage();
      showFactoid();
      fadeWrongAnswers();
      answerChoices = [];

      // Check for end of game
      if (questionIndex >= (numQuestions - 1)) {
        var results = showResults();
        var restart = $('.restart').show();
        restart.on('click', function() {
          runGame()
        })
        
      } 
      else if (questionIndex < (numQuestions - 1))
      { 
        questionIndex++
        var nextQuestion = setTimeout(function() {
          $('#timeremaining').html('');
          showQuestion(questionIndex);
          showButtons(questionIndex);
          console.log(count) 
        }, 10000);
      }
    });
  }
  function showResults() {
    var correctDiv = $('<div>Correct: ' + correct + '</div>')
    var incorrectDiv = $('<div>Incorrect: ' + incorrect + '</div>')
    var unansweredDiv = $('<div>Unanswered: ' + unanswered + '</div>')
    correctDiv.css("color", "green")
    incorrectDiv.css("color", "red")
    unansweredDiv.css("color", "gray")

    $('.finalresults').append(correctDiv, incorrectDiv, unansweredDiv)
  }

  function showCorrect() {
    correct++
    resultMsg = $('.framemiddle').html('Yes! The correct answer is ' + randomArr[questionIndex][1] + '.');
  }

  function showIncorrect() {
    incorrect++
    resultMsg = $('.framemiddle').html('Wrong! The correct answer is ' + randomArr[questionIndex][1] + '.'); 
  }

  function showImage() {
    $('.framemiddle').prepend('<img id="img" class="img-fluid" src="assets/images/' + randomArr[questionIndex][4] + '" />'); // displaying image
    $('#img').css({
      'display': 'block',
      'margin': 'auto',
      'margin-bottom': '30px'
    }) //styling image
  }

  function showFactoid() {
    $('.framemiddle').append('<div class="factoid">' + randomArr[questionIndex][3] + '</div>'); // Display result factoid
    $('.factoid').css({
      "margin-top": "20px",
      "font-size": "1rem"
    });
  }
  // Setting transparency on wrong answers
  function fadeWrongAnswers() {
    var answer = (randomArr[questionIndex][1]);
    for (i = 0; i < answerChoices.length; i++) {
      var value = $('.buttontext-' + i).text()
      // Fading only incorrect answers
      if (answer !== value) {
        $('.option-' + i).css('opacity', '.3');
      }
    }
  }
  //document ready
});