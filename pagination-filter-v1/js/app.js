var html = '<div class="pagination"><ul></ul></div>';
var studentsPerPage = 10;
var studentItemLength = $('.student-item').length;
var counter = studentItemLength;
var number;	
var count = 1;
//Function to create classes for showing on the page
function createClass(student) {

	if($('.page' + count).length < studentsPerPage) {
		$(student).addClass('page' + count);
	}else {
		count = count + 1;
		$(student).addClass('page' + count);
	}
		
}

//Clears the page class 
function clearClass(){
		var howMany = howManyPages(counter);
		for(i = 1; i <= howMany; i++) {
			$('.student-item').removeClass('page' + i);
		}
}

//Figures out how many pages to create
function howManyPages(students) {
	var howManyPages = Math.ceil(students / studentsPerPage);
	return howManyPages;
}

//Function to show the students on the screen and which ones to show
function showStudents(pageNumber){
	$('.student-item').hide();
	$('.page' + pageNumber).fadeIn(1000);	
}
//Create Navigation Bar function
function navBar(students) {
	var howManyPagesCreated = howManyPages(students);
	$('.pagination ul li').remove();
	for( i = 1; i <= howManyPagesCreated; i++){
		html = '<li><a href=#>' + i + '</a></li>';
		$('.pagination ul').append(html);	
	}
	$('.pagination ul li:first a').addClass('active');
}

// Function that will be called when clicking on the page numbers.
function clickingPageNumber() {
	$('.pagination ul li a').click(function () {
		number = $(this).html();
		$('.pagination ul li a').removeClass('active');
		$(this).addClass('active');
		showStudents(number)
	});
}

//Makes the page reload to first page
function loadFirstPage(){
			counter = studentItemLength;
			clearClass();
			$('.student-item').each(function () {			
			createClass(this); 
			});
			navBar(counter);
			showStudents(1);
			clickingPageNumber();
}

//Creates the ability to search for the students via the input box.
function searchStudents() {
		clearClass();
		$('.no-student').hide();
		$('.student-item').hide();
		counter = 0;
		count = 1;
		var input = $('input').val();
		input = input.toLowerCase();
		if(input.length === 0){
			loadFirstPage();
			
		}else{
			for(i = 1; i <=studentItemLength; i++){
				
				var name = $('.student-item:nth-child('+ i + ') h3').html();
				name = name.toLowerCase();
				var email = $('.student-item:nth-child('+ i + ') .email').html();
				email = email.toLowerCase();
				var nameOutput = name.indexOf(input);
				var emailOutput = email.indexOf(input);
				if((nameOutput !== -1) || (emailOutput !== -1)){
					var item = $('.student-item:nth-child(' + i + ')');
					createClass(item);
					counter ++;
				}
				
			}
			if(counter === 0){
				$('.no-student').show();
			}
			navBar(counter);
			showStudents(1);
			clickingPageNumber();
			
		}
	
}

$(function(){
	
	//Create the Search bar
	var searchHtml = '<div class="student-search"><input placeholder="Search for students..." type="text"><button>Search</button></div>';
	$('.page-header').append(searchHtml);
	$('.student-item').hide();
	var noStudentInfo = '<div class="no-student"><p>No Student by that name or email found</p></div>';
	$('.page').append(noStudentInfo);
	//Create the Navigation bar on bottom of the page	
	$('.page').append(html);
	loadFirstPage();
	
	$('.student-search input').keyup(function () {
		searchStudents();
	});

});


		
	

	

