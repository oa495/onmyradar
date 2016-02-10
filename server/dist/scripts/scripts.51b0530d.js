"use strict";angular.module("clientApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","todoService"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/radar",{templateUrl:"views/radar.html",controller:"RadarCtrl",controllerAs:"radar"}).otherwise({redirectTo:"/"})}]),angular.module("clientApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("clientApp").controller("TodoCtrl",["$scope","$http","Todos",function(a,b,c){a.formData={},a.loading=!0,c.get().success(function(b){a.todos=b,a.loading=!1}),a.createTodo=function(){console.log("creating"),void 0!==a.formData.title&&(a.loading=!0,c.create(a.formData).success(function(b){a.loading=!1,a.formData={},a.todos=b}))},a.deleteTodo=function(b){a.loading=!0,console.log("deleting"),c["delete"](b).success(function(b){a.loading=!1,a.todos=b})}}]),angular.module("clientApp").controller("RadarCtrl",["Todos",function(a){function b(){var a=[];g=h;for(var b=400,d=0;d<j.length;d++)a=g.filter(function(a){return a.dayOfWeek.toLowerCase()===j[d]?a:void 0}),b-=50,i[j[d]]={tasks:a,dayRadius:b,taskCircles:[]},a=[];c()}function c(){f=new Raphael(document.getElementById("visualization"),k.width,k.height);var a=f.width/4+50,b=f.height/2;for(var c in i)i.hasOwnProperty(c)&&(i.dayCircle=f.circle(a,b,i[c].dayRadius),d(c,i[c].dayRadius,a,b))}function d(a,b,c,d){for(var g,h,j=i[a].tasks,k=0;k<j.length;k++){g=e(b,c,d,k,j.length),h=j[k].priority;var l=g.x,m=g.y;i[a].taskCircles.push(f.circle(l,m,4*h).attr({fill:"#000"}).data("title",j[k].title).data("description",j[k].description).click(function(){alert(this.data("title"))}))}}function e(a,b,c){var d=Math.random()*Math.PI*2;return{x:b+a*Math.cos(d),y:c+a*Math.sin(d)}}var f,g,h={},i={},j=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],k={width:window.innerWidth||document.body.clientWidth,height:window.innerHeight||document.body.clientHeight};a.get().success(function(a){h=a,console.log(h),console.log("got it, move along"),b()})}]),angular.module("todoService",[]).factory("Todos",["$http",function(a){return{get:function(){return a.get("/api/todos")},create:function(b){return a.post("/api/todos",b)},"delete":function(b){return a["delete"]("/api/todos/"+b)}}}]),angular.module("clientApp").run(["$templateCache",function(a){a.put("views/main.html",'<div ng-controller="TodoCtrl"> <div class=""> <h1>On my Radar</h1> <span class="label label-info">{{ todos.length }}</span> </div> <div> <div> <div class="checkbox" ng-repeat="todo in todos"> <label> <input type="checkbox" ng-click="deleteTodo(todo._id)"> {{ todo.title }} </label> </div> </div> </div> <div> <div> <form> <div> <label>Title</label><input type="text" class="" placeholder="I want to buy a puppy that will love me forever" ng-model="formData.title"> <label>Priority</label><input type="number" class="" ng-model="formData.priority"> <label>Description</label><input type="text" class="" ng-model="formData.description"> <label>Day of the Week</label><input type="text" class="" ng-model="formData.dayOfWeek"> </div> <button type="submit" class="" ng-click="createTodo()">Add</button> </form> </div> </div> <button><a href="#/radar">Visualize</a></button> </div>'),a.put("views/radar.html",'<div id="visualization"> </div>')}]);