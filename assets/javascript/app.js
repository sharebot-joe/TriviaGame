$(document).ready(function() {

	var correct = 0;
	var incorrect = 0;
	
		
	// function getRandomInt(min, max) {
	//   return Math.floor(Math.random() * (max - min + 1) + min);
	// }

	// function showRandomNumber () {
	// 	randomNumber = getRandomInt(19, 120)
	// 	$('.targetnum').html(randomNumber)

	// }
	// function randomizeCrystals () {
	// 	$(".red, .blue, .yellow, .green").each(function(){
	// 		var random = getRandomInt(1, 12)
	// 		$(this).attr("value", random)	
	// 	})
	// }
	// function resetGame () {
	// 	showRandomNumber()
	// 	randomizeCrystals();
	// 	playerTotal = 0;
	// 	$('.playernum').html(playerTotal)
	// }
	function hideIntro() {
		$('#introimage').hide();
		$('.clickme').hide();
	}
	function countdown() {
		// i = 15
		// $('.frametop').html('<div>' + i + '</div>')
		var count=30;

		var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

		function timer()
		{
		  count=count-1;
		  if (count <= 0)
		  {
		     clearInterval(counter);
		     //counter ended, do something here
		     return;
		  }
	  	$('.frametop').html(count + " secs")
		  // document.getElementById("timer").innerHTML=count + " secs"; // watch for spelling
		}
		// var timeleft = 10;
		// 	var downloadTimer = setInterval(function(){
		// 	  document.getElementsByClassName("frametop").value = 10 - --timeleft;
		// 	  if(timeleft <= 0)
		// 	    clearInterval(downloadTimer);
		// 	},1000);
		
		// runCountdown(i)
	}
	function runCountdown (index) {
			
		// for (i = 1; i < 10; i++) {
		// 	setTimeout(function() {
		//     console.log("inside setinterval" + i)
		// 		$('.frametop').html('<div>' + i + '</div>')
		//   }, 1000);	
		// }
		// for (i = index; i > 0; i--) {
		// 	setTimeout(function() {
		//     console.log("inside setinterval" + i)
		// 		$('.frametop').html('<div>' + i + '</div>')
		//   }, 1000);	
		// }
	}

	// // Run main program
	// showRandomNumber();
	// randomizeCrystals();
	

	// Onclick Events
	$('.frame').one('click', function() {

		// Add numbers and display result
		hideIntro();
		countdown();
		// showQuestion();
	});
	
//document ready
});	
