"use strict";

var to_dos = {}; //stores json data from the ajax call
var allWeek = {}; //storing all the tasks for the week
var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var ready, paper;
var tasksForWeek;
//paper is the object rapahel uses to draw to the screen
// ready determines if the visualization can start
 //objects that represents a day with tasks
var dayCircles = {};

function runMainProgram() {	
	var tempArray = []; //temporarily stores the tasks that correspond to a day of the week
	tasksForWeek = to_dos['to-dos'];
	var dayRadius = 400; 
	for (var i = 0; i < daysOfWeek.length; i++) { //loop over days of the week
		tempArray = tasksForWeek.filter(function(obj) { //getting all the tasks for that day of the week
			if (obj.dayOfWeek === daysOfWeek[i]) {
				return obj;
			}
		});
		dayRadius-=50; //drawing circles that are smaller than the one before (like a radar)
		allWeek[daysOfWeek[i]] = {
			tasks: tempArray,
			dayRadius: dayRadius,
			taskCircles: []
		};
		tempArray = [];
		/*for (var x in allWeek) {
			 if (allWeek.hasOwnProperty(x)) {
				console.log(allWeek[x].dayRadius);
			}
		}*/
	}
	ready = true; //after all this processing is done, the visualization can start
}
// getting the data from the json/or mondodb database
$.ajax({
	dataType:'json',
	url:'to-dos.json',
	success: function(returnData, statusValue, weirdNewObject) { 
		to_dos = returnData; //store the data returned in to_dos
		console.log ('got it, move along'); 
		runMainProgram(); //start the program 
	},
	error: function(xhr, status, error) { //if there's a problem
		 var err = eval("(" + xhr.responseText + ")");
  		 alert(err.Message);
	}
}); 


$(document).ready(function() {
	 $( "#start-visual" ).click(function() {
	  startVisualization();
	});
});

/***** VISUALIZATIONNNNNNN ***/
function startVisualization() {
	console.log('here');
	if (ready == true) { //only start visualization if all the processing in runMainProgram is done
		console.log('visualization started!');
		 paper = new Raphael(document.getElementById('visualization'), 1200, 850);
		 // dow = day of week
		 	var centerX = paper.canvas.offsetWidth/2+150; //get center of page
			var centerY = paper.canvas.offsetHeight/2; 
		 for (var dow in allWeek) {
			  if (allWeek.hasOwnProperty(dow)) {
			  	 allWeek.dayCircle = paper.circle(centerX, centerY, allWeek[dow].dayRadius);
		   		 drawTaskCircles(dow, allWeek[dow].dayRadius, centerX, centerY);
		  	}
		}
	}
}


function drawTaskCircles(dow, radius, centerX, centerY) {
	var points;
	var priority;
	var tasksForDay = allWeek[dow].tasks;
	for (var i = 0; i < tasksForDay.length; i++) {
		points = getRandomPoint(radius, centerX, centerY, i, tasksForDay.length);
		priority = tasksForDay[i].priority;
		var x = points.x;
		var y = points.y;
		allWeek[dow].taskCircles.push(paper.circle(x, y, priority*4).red()); 
	} 
}

function getRandomPoint(radius, centerX, centerY, i, items) {
	var angle = Math.random() * Math.PI * 2;
    return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle) 
    };
}
Raphael.el.red = function () {
    this.attr({fill: "#f00"});
};