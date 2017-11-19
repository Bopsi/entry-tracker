var app = angular.module("ctsEvent", []);
app.controller("myCtrl", function($scope, $location, $http, $window) {
	params = $location.absUrl().split('?')[1];
	params = params.split('&');
	
	if(params.length!=2){
		alert("Incorrect numbers of query parameters, Check url and try again");
	}
	else if(params[0].indexOf('id=') != 0 || params[1].indexOf('name=') != 0){
		alert("Incorrect query parameters, Check url and try again");
	}

	console.log(params);
	$scope.status = false;
	$scope.invited = {
		"id" : "",
		"name" : "",
		"registered" : false,
		"hightea" : false,
		"luncheon" : false
	}
	
	if(localStorage.getItem("eventRole") != 'volunteer'){
		$window.location.href = '/home';
	}
	
	$scope.checkInvited = function() {
		$("#loading").show();
		$http({
			method : "GET",
			url : "/checkInvited?" + params[0]
		}).then(function mySuccess(response) {
					console.dir(response);
					if (response.data == "") {
						console.log("not found");
					} else {
						$scope.status = true;
						$http({
									method : "GET",
									url : "/registerInvited?" + params[0] + '&'	+ params[1].substring(0, 5)	+ response.data.name
						}).then(function mySuccess(response) {
							console.dir(response);
							$scope.invited = response.data;
							$("#loading").hide();
						}, function myError(response) {
							console.dir(response);
							$scope.error = response.statusText;
							alert("Something went wrong, try again");
							$("#loading").hide();
						});
					}
				}, function myError(response) {
					console.dir(response);
					$scope.error = response.statusText;
					alert("Something went wrong, try again");
					$("#loading").hide();
				});
	}

	$scope.checkInvited();

	$scope.update = function(payload) {
		console.log(JSON.stringify($scope.status));
		$("#loading").show();
		$http({
			method : "POST",
			url : "/updateAttendee",
			data : payload
		}).then(function mySuccess(response) {
			$scope.invited = response.data;
			$("#loading").hide();
		}, function myError(response) {
			console.dir(response);
			$scope.error = response.statusText;
			alert("Something went wrong, try again");
			$("#loading").hide();
		});
	}

	$scope.updateRegitration = function() {	
		if ($scope.invited.registered != true) {
			var paylaod = JSON.parse(JSON.stringify($scope.invited));
			paylaod.registered = true;
			$scope.update(paylaod);
		}
	}

	$scope.updateTea = function() {
		if ($scope.invited.registered == true) {
			var paylaod = JSON.parse(JSON.stringify($scope.invited));
			paylaod.hightea = true;
			$scope.update(paylaod);
		}
	}

	$scope.updateLunch = function() {
		if ($scope.invited.registered == true) {
			var paylaod = JSON.parse(JSON.stringify($scope.invited));
			paylaod.luncheon = true;
			$scope.update(paylaod);
		}
	}
	
});