document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    StatusBar.overlaysWebView(false);
}


var scoreBoard = "";
var boxes = [];
var students = [];
var student = "";
var previousStudent;
var timeUp = false;
var score = 0;
var previousScore = 0;

function randomTime(min, max) 
{
	return Math.round(Math.random() * (max - min) + min);
}

function randomStudent(students) 
{
	const index = Math.floor(Math.random() * students.length);
	const student = students[index];
	console.log('student at index: ' + student);
	// don't pick the same box twice
	if (student === previousStudent) 
	{
		return randomStudent(students);
	}
	previousStudent = student;
	return student;
}

function popUp() 
{
	// get a random time between 2s and 10s
	const time = randomTime(300, 1000);
	console.log(time);
	const student = randomStudent(students);
	console.log(student);
	// box.classList.add('up');
	student.src = "img/red.png";
	// student.addEventListener('click', hit);
	// student.addEventListener('click', function(event) {
	// 	///this will execute only once
	// 	// alert('only once!');
	// 	var targetStudent = event.target || event.srcElement;
	// 	hit(targetStudent);
	// 	this.removeEventListener('click', arguments.callee);
	// });
	var click = 0;
	// student.addEventListener('click', function(event) 
	// {
	// 	click++;
	// 	if(click == 1) 
	// 	{
	// 		this.removeEventListener('click', arguments.callee, false);
	// 		$(this).attr("src","img/blank.png");
	// 		score += 10;
	// 		scoreBoard.textContent = score;
	// 		console.log('score: ' + score);
	// 		previousScore = score;
	// 	}
	// });
	$(student).one("click", function(event) {
		click++;
		if(click == 1) 
		{
			// this.removeEventListener('click', arguments.callee, false);
			$(this).attr("src","img/blank.png");
			score += 10;
			scoreBoard.html(score);
			console.log('score: ' + score);
			previousScore = score;
		}
	});
	// var that = this;
	// document.getElementById("myImg").src = "hackanm.gif";
	setTimeout(() => {
		// this.attr("src","blank.png");
		student.src = "img/blank.png";
		if (!timeUp) popUp();
	}, time);
}

function startGame() 
{
	scoreBoard.html(0);
	timeUp = false;
	score = 0;
	popUp();
	setTimeout(() => timeUp = true, 30000)
}

// function hit(targetStudent) 
// {
// 	// if(!e.isTrusted) return; // cheater!
// 	score += 10;
// 	// this.classList.remove('up');
// 	console.log('inside hit(): ' + $(this));
// 	console.log('inside hit(): ' + student);
// 	targetStudent.removeEventListener("click", hit);
// 	student.attr("src","img/blank.png");
// 	// $(this).removeEventListener("click", hit);
// 	// $(this).attr("src","img/blank.png");
// 	scoreBoard.textContent = score;
// 	console.log('score: ' + score);
// }

// $(document).on("pageshow", "#gameplay-screen", function() 
window.onload = function() 
{
	$.mobile.changePage("#welcome-screen"+"#gameplay-screen", {
        transition: "slide",
        reverse: true
    });
	boxes = $('.box');
	boxes = [].slice.call($('.box'));
	console.log(boxes);
	scoreBoard = $('#score');
	// students = $('.student');
	students = [].slice.call($('.student'));
	console.log(students);
	// students.forEach(student => student.addEventListener('click', hit));
	// students.each(function ()
	// for (var i = 0; i < students.length; i++)
	// {
	// 	students[i].addEventListener('click', hit);
	// }
	// [].forEach.call(students, function(student) 
	// {
	//   student.addEventListener('click', hit);
	// });
	startGame();
}




// Pagecreate will fire for each of the pages in this demo
// but we only need to bind once so we use "one()"
$( document ).one( "pagecreate", ".demo-page", function() {
	// Initialize the external persistent header and footer
	$( "#header" ).toolbar({ theme: "b" });
	$( "#footer" ).toolbar({ theme: "b" });

	// Handler for navigating to the next page
	function navnext( next ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", next + ".html", {
			transition: "slide"
		});
	}

	// Handler for navigating to the previous page
	function navprev( prev ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", prev + ".html", {
			transition: "slide",
			reverse: true
		});
	}

	// Navigate to the next page on swipeleft
	$( document ).on( "swipeleft", ".ui-page", function( event ) {
		// Get the filename of the next page. We stored that in the data-next
		// attribute in the original markup.
		var next = $( this ).jqmData( "next" );

		// Check if there is a next page and
		// swipes may also happen when the user highlights text, so ignore those.
		// We're only interested in swipes on the page.
		if ( next && ( event.target === $( this )[ 0 ] ) ) {
			navnext( next );
		}
	});

	// Navigate to the next page when the "next" button in the footer is clicked
	$( document ).on( "click", ".next", function() {
		var next = $( ".ui-page-active" ).jqmData( "next" );

		// Check if there is a next page
		if ( next ) {
			navnext( next );
		}
	});

	// The same for the navigating to the previous page
	$( document ).on( "swiperight", ".ui-page", function( event ) {
		var prev = $( this ).jqmData( "prev" );

		if ( prev && ( event.target === $( this )[ 0 ] ) ) {
			navprev( prev );
		}
	});

	$( document ).on( "click", ".prev", function() {
		var prev = $( ".ui-page-active" ).jqmData( "prev" );

		if ( prev ) {
			navprev( prev );
		}
	});
});

$( document ).on( "pageshow", ".demo-page", function() {
	var thePage = $( this ),
		title = thePage.jqmData( "title" ),
		next = thePage.jqmData( "next" ),
		prev = thePage.jqmData( "prev" );

	// Point the "Trivia" button to the popup for the current page.
	$( "#trivia-button" ).attr( "href", "#" + thePage.find( ".trivia" ).attr( "id" ) );

	// We use the same header on each page
	// so we have to update the title
	$( "#header h1" ).text( title );

	// Prefetch the next page
	// We added data-dom-cache="true" to the page so it won't be deleted
	// so there is no need to prefetch it
	if ( next ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "load", next + ".html" );
	}

	// We disable the next or previous buttons in the footer
	// if there is no next or previous page
	// We use the same footer on each page
	// so first we remove the disabled class if it is there
	$( ".next.ui-state-disabled, .prev.ui-state-disabled" ).removeClass( "ui-state-disabled" );

	if ( ! next ) {
		$( ".next" ).addClass( "ui-state-disabled" );
	}
	if ( ! prev ) {
		$( ".prev" ).addClass( "ui-state-disabled" );
	}
});