var app = angular.module("ctsEvent", []);
app.controller("myCtrl", function($scope, $location, $http, $window) {
	var countDownDate = new Date("Nov 17, 2017 10:59:59").getTime();
	var now = new Date().getTime();
	params = $location.absUrl().split('?')[1];
	params = params.split('&');

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
						}, function myError(response) {
							console.dir(response);
							$scope.error = response.statusText;
						});
					}
				}, function myError(response) {
					console.dir(response);
					$scope.error = response.statusText;
				});
	}

	$scope.checkInvited();

	$scope.update = function() {
		console.log(JSON.stringify($scope.status));
		$http({
			method : "POST",
			url : "/updateAttendee",
			data : $scope.invited
		}).then(function mySuccess(response) {
			// console.dir(response);
		}, function myError(response) {
			console.dir(response);
			$scope.error = response.statusText;
		});
	}

	$scope.updateRegitration = function() {
		if ($scope.invited.registered != true) {
			$scope.invited.registered = true;
			$scope.update();
		}
	}

	$scope.updateTea = function() {
		if ($scope.invited.registered == true) {
			$scope.invited.hightea = true;
			$scope.update();
		}
	}

	$scope.updateLunch = function() {
		if ($scope.invited.registered == true) {
			$scope.invited.luncheon = true;
			$scope.update();
		}
	}
	
	//3600,5400
});