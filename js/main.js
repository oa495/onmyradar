var tasksForWeek = {};
function runMainProgram() {	
	console.log('here');
}

$.ajax({
	dataType:'json',
	url:'to-dos.json',
	success: function(returnData, statusValue, weirdNewObject) { 
		tasksForWeek = returnData;
		console.log ('got it, move along'); 
		runMainProgram();
	},
	error: function(xhr, status, error) {
		 var err = eval("(" + xhr.responseText + ")");
  		 alert(err.Message);
	}
});
