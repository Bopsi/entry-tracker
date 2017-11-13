var app = angular.module("ctsEvent", [ "chart.js" ]);
app.controller("myCtrl", function($scope, $location, $http) {

	$scope.inviteds = [];
	$scope.attendees = [];
	$scope.tea = 0;
	$scope.lunch = 0;
	$scope.label_all = [ "Invited", "Attended" ];
	$scope.data_all = [ 0, 0 ];
	$scope.label_tea = [ "Present", "Taken" ];
	$scope.data_tea = [ 0, 0 ];
	$scope.label_lunch = [ "Present", "Taken" ];
	$scope.data_lunch = [ 0, 0 ];
	$scope.colors = ['#F7EB25', '#4F8D40'];

	$scope.fetchInviteds = function() {
		$http({
			method : "GET",
			url : "/getInvitationList"
		}).then(function mySuccess(response) {
			console.log("Invited");
			console.dir(response);
			$scope.inviteds = response.data;
			$scope.data_all[0] = $scope.inviteds.length;
		}, function myError(response) {
			console.dir(response);
			$scope.error = response.statusText;
		});
	}

	$scope.fetchAttendees = function() {
		$http({
			method : "GET",
			url : "/getAllAttendee"
		}).then(function mySuccess(response) {
			console.log("Attendee");
			console.dir(response);
			$scope.attendees = response.data;
			$scope.data_all[1] = $scope.attendees.length;
			$scope.count();
			$scope.data_tea[0] = $scope.attendees.length;
			$scope.data_tea[1] = $scope.tea;
			$scope.data_lunch[0] = $scope.attendees.length;
			$scope.data_lunch[1] = $scope.lunch;
		}, function myError(response) {
			console.dir(response);
			$scope.error = response.statusText;
		});
	}

	$scope.initialize = function() {
		$scope.fetchInviteds();
		$scope.fetchAttendees();

		$scope.data_all = [];
		$scope.data_all.push($scope.inviteds.length);
		$scope.data_all.push($scope.attendees.length);

		$scope.tea = 0;
		$scope.lunch = 0;

		console.log($scope.data_all);
	}

	$scope.initialize();

	$scope.present = function(id) {
		for (var i = 0; i < $scope.attendees.length; i++) {
			if ($scope.attendees[i].id == id) {
				return true;
			}
		}
		return false;
	}

	$scope.count = function() {
		for (var i = 0; i < $scope.attendees.length; i++) {
			if ($scope.attendees[i].hightea == true) {
				$scope.tea++;
			}
			if ($scope.attendees[i].luncheon == true) {
				$scope.lunch++;
			}
		}
	}
});