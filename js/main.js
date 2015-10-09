
var to_dos = {};
var areaOfScreenForDay = {}
var weeklyTasks = {};
var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var ready, paper;
var taskCircles = [];
var dayCircles = [];

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
		areaOfScreenForDay[daysOfWeek[i]] = Math.random() * Math.PI * 2;
		tempArray = [];
	}
	//console.log(JSON.stringify(weeklyTasks));
	/*for (var j = 0; j < daysOfWeek.length; j++) {
		console.log(JSON.stringify(weeklyTasks[daysOfWeek[j]]));
	}
	for (var n = 0; n < daysOfWeek.length; n++) {
		console.log(areaOfScreenForDay[daysOfWeek[n]]);
	} */
	ready = true;
}
function getRandomPoint(radius, angle) {
    return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
    };
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
		 var dayRadius = 400;
		 	var centerX = paper.canvas.offsetWidth/2+150;
			var centerY = paper.canvas.offsetHeight/2; 
		 for (var dow in weeklyTasks) {
			  if (weeklyTasks.hasOwnProperty(dow)) {
			  	 dayCircles.push(paper.circle(centerX, centerY, dayRadius-=50));
		   		 drawTaskCircles(dow);
		  	}
		}
	}
}


function drawTaskCircles(dow) {
	var points;
	var tasksForWeek = weeklyTasks[dow];
	for (var i = 0; i < tasksForWeek.length; i++) {
		var tasksForDay = tasksForWeek[i];
	}
}