'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:RadarCtrl
 * @description
 * # RadarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('RadarCtrl', function (Todos) {
  		(function(){
		  Date.prototype.getWeek = function() {
		        var onejan = new Date(this.getFullYear(), 0, 1);
		        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
		    };

    		var weekNumber = (new Date()).getWeek();
    		var now = new Date();
			var dateSpace = document.getElementById('date-details');
			var week = createElement('p', 'Week ' + weekNumber + '/52', {'class': 'date', 'id': 'week'});
			var today = now.toDateString();
			var date = createElement('p', today, {'class':'date'});
			dateSpace.appendChild(week); 
			dateSpace.appendChild(date); 
		}());

	  	var to_dos = {}; //stores json data from the ajax call
		var allWeek = {};  //objects that represents everything in a week
		var daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		var paper;
		var tasksForWeek; //storing all the tasks for the week
		//paper is the object rapahel uses to draw to the screen
		// ready determines if the visualization can start
		Todos.get()
        .success(function(data) {
            	to_dos = data; //store the data returned in to_dos
				console.log ('got it, move along'); 
				runMainProgram(); //start the program 
        });

		function runMainProgram() {	
			var tempArray = []; //temporarily stores the tasks that correspond to a day of the week
			tasksForWeek = to_dos;
			var dayRadius = 400; 
			function getTasksForDOW(obj) {
				if ((obj.dayOfWeek).toLowerCase() === daysOfWeek[i]) {
						return obj;
				}
			}
			for (var i = 0; i < daysOfWeek.length; i++) { //loop over days of the week
				tempArray = tasksForWeek.filter(getTasksForDOW);
				//getting all the tasks for that day of the week
				dayRadius-=50; //drawing circles that are smaller than the one before (like a radar)
				//for each day in the week, there are tasks, a radius to draw a circle and a list of tasks to do 
				allWeek[daysOfWeek[i]] = {
					tasks: tempArray,
					dayRadius: dayRadius,
					taskCircles: []
				};
				tempArray = [];
			}
			
			startVisualization();
		}
		function createElement(element, text, attributes, child) {
			var theElement;
			if (element) {
				theElement = document.createElement(element);
			}
			if (attributes) {
				for (var attr in attributes) {
					theElement.setAttribute(attr, attributes[attr]);
				}
			}
			if (text) {
				var theText = document.createTextNode(text);
				theElement.appendChild(theText);
			}
			if (child) {
				theElement.appendChild(child);
			}
			return theElement;
		}

		function startVisualization() {
			 var w = $(window).width();
			 var h =  $(window).height();
			 paper = new Raphael(document.getElementById('visualization'), w, h);
			 paper.setViewBox(0, 0, w, h, true);
		     paper.setSize('100%', '100%');
			 // dow = day of week
			 	var centerX = w/2; //get center of page
				var centerY = h/2; 
				paper.circle(centerX, centerY, 20).attr({fill: "#00BCD1", stroke: "#ffffff"});
			 for (var dow in allWeek) {
				  if (allWeek.hasOwnProperty(dow)) {
				  	 allWeek.dayCircle = paper.circle(centerX, centerY, allWeek[dow].dayRadius).attr({stroke: "#ffffff", 'fill-opacity': 0.2, fill: "#00BCD1"});
			   		if (allWeek[dow].tasks.length > 0) {
			   			drawTaskCircles(dow, allWeek[dow].dayRadius, centerX, centerY);
			   			checkForOverlap(allWeek[dow].taskCircles, allWeek[dow].dayRadius, centerX, centerY);
			   		}
			  	}
			}
		}

		function drawTaskCircles(dow, radius, centerX, centerY) {
			var points;
			var priority;
			var tasksForDay = allWeek[dow].tasks;
			allWeek[dow].taskCircles = [];
			var set = paper.set();
			var size;
			var labelize = function (shape, label) {
				paper.setStart();
				var theLabel = paper.text(shape.attr("cx")+ shape.attr('r')*6, shape.attr("cy"), " " + label + " ").attr({
					'font-size': 13, 'fill': '#ffffff', 'font-family': 'Lato, sans-serif'
				});
				theLabel.node.setAttribute('class', "task-text");
				var box = theLabel.getBBox();
				var rect = paper.rect(box.x, box.y, box.width, box.height).attr('fill', 'black');
				rect.node.setAttribute('class', 'text-box');
				theLabel.toFront();
				var st = paper.setFinish();

				shape.data("label", st);

				var hoverIn = function() {
					this.animate({"fill-opacity": 0.9, fill: "#00BCD1", stroke: "#fff", "stroke-width": 20, "stroke-opacity": 0.7 }, 1000);
					this.data("label").show();
				};
				var hoverOut = function() {
					this.animate({"fill-opacity": 1, fill: "#fff", stroke: "#00BCD1", "stroke-width": size*1.1, "stroke-opacity": 1 }, 1000);
					this.data("label").hide();
				};
				shape.data("label").hide();
				shape.hover(hoverIn, hoverOut, shape, shape);
				return shape;
			};

			for (var i = 0; i < tasksForDay.length; i++) {
				points = getRandomPoint(radius, centerX, centerY);
				priority = tasksForDay[i].priority;
				var x = points.x;
				var y = points.y;
				size = priority*4.5;
				var circ = paper.circle(x, y, size).data("title", tasksForDay[i].title);
				circ.data("description", tasksForDay[i].description);
				circ.node.setAttribute('class', "circle");				
				circ = labelize(circ, circ.data('title'));
				set.push(circ); 
			}
			set.attr({fill: "#ffffff", stroke: "#00BCD1", "stroke-width": size*1.1 });
		    allWeek[dow].taskCircles = set;
		    set = [];
		}

		function checkForOverlap(circArr, radius, centerx, centery) {
			for (var i = 0; i < circArr.length; i++) {
				 var posX1 = circArr[i].attr("cx") || 0,
            	 posY1 = circArr[i].attr("cy") || 0;
            	 var r1 = circArr[i].attr("r") || 0;
				for (var j = 1; j < circArr.length; j++) {
					var posX2 = circArr[j].attr("cx") || 0,
            		posY2 = circArr[j].attr("cy") || 0,
            		r2 = circArr[j].attr("r") || 0;
					var distance = Math.sqrt(((posX2 - posX1)*(posX2 - posX1)) + ((posY2 - posY1)* (posY2 - posY1)) - (r2 + r1));
					if (distance < 25) {
						console.log('distance too small');
						var position = getRandomPoint(radius, centerx, centery);
						var dx = Math.abs(position.x - posX2);
						var dy = Math.abs(position.y - posY2);
						circArr[j].translate(dx, dy);
						checkForOverlap(circArr, radius, centerx, centery);
					}
				}
			}
		}	
		function getRandomPoint(radius, centerX, centerY) {
			var angle = Math.random() * Math.PI * 2;
		    return {
		        x: centerX + radius * Math.cos(angle),
		        y: centerY + radius * Math.sin(angle) 
		    };
		}
  });
