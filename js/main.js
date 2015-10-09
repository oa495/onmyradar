
var to_dos = {};
var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var weeklyTasks = {};
var tasksForWeek;
var ready;
var allCircles = [];
var paper;
function runMainProgram() {	
	var tempArray = [];
	tasksForWeek = to_dos['to-dos'];
	for (var i = 0; i < daysOfWeek.length; i++) {
		tempArray = tasksForWeek.filter(function(obj) {
			if (obj.dayOfWeek === daysOfWeek[i]) {
				return obj;
			}
		});
		weeklyTasks[daysOfWeek[i]] = tempArray;
		tempArray = [];
	}
	//console.log(JSON.stringify(weeklyTasks));
	/*for (var j = 0; j < daysOfWeek.length; j++) {
		console.log(JSON.stringify(weeklyTasks[daysOfWeek[j]]));
	}*/
	ready = true;
}

$.ajax({
	dataType:'json',
	url:'to-dos.json',
	success: function(returnData, statusValue, weirdNewObject) { 
		to_dos = returnData;
		console.log ('got it, move along'); 
		runMainProgram();
	},
	error: function(xhr, status, error) {
		 var err = eval("(" + xhr.responseText + ")");
  		 alert(err.Message);
	}
}); 


$( document ).ready(function() {
	 $( "#start-visual" ).click(function() {
	  startVisualization();
	});
});

/***** VISUALIZATIONNNNNNN ***/
function startVisualization() {
	console.log('here');
	if (ready == true) {
		console.log('visualization started!');
		 paper = new Raphael(document.getElementById('visualization'), 1200, 850);
		 // dow = day of week
		 for (var dow in weeklyTasks) {
			  if (weeklyTasks.hasOwnProperty(dow)) {
		   		 drawTaskCircles(dow);
		  	}
		}
	}
}


function drawTaskCircles(dow) {
	var x, y = 200;
	var tasksForWeek = weeklyTasks[dow];
	for (var i = 0; i < tasksForWeek.length; i++) {
		var tasksForDay = tasksForWeek[i];
		for (var task in tasksForDay ) {
			var priority = tasksForDay.priority*20;
			x += Math.random() * (800 - 60) + 60;
			y += Math.random() * (680 - 80) + 80;
			allCircles.push(paper.circle(x, y, priority));
			x = 200;
			y = 200;
		}
	}
}