var to_dos = {};
var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var weeklyTasks = [];
var tasksForWeek;
function runMainProgram() {	
	tasksForWeek = to_dos['to-dos'];
	for (var i = 0; i < daysOfWeek.length; i++) {
		weeklyTasks.push(tasksForWeek.filter(function(obj) {
			if (obj.dayOfWeek === daysOfWeek[i]) {
				return obj;
			}
		}));
	}
	//console.log(JSON.stringify(weeklyTasks));
	for (var i = 0; i < weeklyTasks.length; i++) {
		console.log(JSON.stringify(weeklyTasks[i]));
	}
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
