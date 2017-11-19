var app = angular.module("ctsEvent", [ "chart.js" ]);
app.factory('Excel',function($window){
    var uri='data:application/vnd.ms-excel;base64,',
        template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
        format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
    return {
        tableToExcel:function(tableId,worksheetName){
            var table=$(tableId),
                ctx={worksheet:worksheetName,table:table.html()},
                href=uri+base64(format(template,ctx));
            return href;
        }
    };
}).controller("myCtrl", function($scope, $location, $http ,Excel,$timeout) {

	$scope.inviteds = [];
	$scope.attendees = [];
	$scope.tea = 0;
	$scope.lunch = 0;
	$scope.label_all = [ "Absent", "Presents" ];
	$scope.data_all = [ 0, 0 ];
	$scope.label_tea = [ "Not Taken", "Taken" ];
	$scope.data_tea = [ 0, 0 ];
	$scope.label_lunch = [ "Not Taken", "Taken" ];
	$scope.data_lunch = [ 0, 0 ];
	$scope.colors = ['#F7EB25', '#4F8D40'];
	$scope.stats = [];
	$scope.chart = true;

	$scope.fetchInviteds = function() {
		$("#loading").show();
		$http({
			method : "GET",
			url : "/getInvitationList"
		}).then(function mySuccess(response) {
			console.log("Invited");
			console.dir(response);
			
			$scope.inviteds = response.data;
			$scope.fetchAttendees();
		}, function myError(response) {
			console.dir(response);
			$scope.error = response.statusText;
			alert("Something went wrong, try again");
			$("#loading").hide();
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
			$scope.data_all[0] = $scope.inviteds.length - $scope.attendees.length;
			$scope.data_all[1] = $scope.attendees.length;
			
			for (var i = 0; i < $scope.attendees.length; i++) {
				if ($scope.attendees[i].hightea == true) {
					$scope.tea++;
				}
				if ($scope.attendees[i].luncheon == true) {
					$scope.lunch++;
				}
			}
			
			$scope.data_tea[0] = $scope.inviteds.length - $scope.tea;
			$scope.data_tea[1] = $scope.tea;
			
			$scope.data_lunch[0] = $scope.inviteds.length - $scope.lunch;
			$scope.data_lunch[1] = $scope.lunch;
			$("#loading").hide();
		}, function myError(response) {
			console.dir(response);
			$scope.error = response.statusText;
			alert("Something went wrong, try again");
			$("#loading").hide();
		});
	}

	$scope.goToList = function(){
		console.log("Go to List View");
		for(var i=0;i<$scope.inviteds.length;i++){ 
			var stat = JSON.parse(JSON.stringify($scope.inviteds[i]));
			var obj = $scope.searchAttendee($scope.inviteds[i].id);
			if(obj!=null){
				stat.registered = obj.registered;
				stat.luncheon = obj.luncheon;
				stat.hightea = obj.hightea;
			}
			$scope.stats.push(stat);
		}
		$scope.chart=false;
	}
	
	$scope.fetchInviteds(); 
	
	$scope.goToChart = function(){
		$scope.chart=true;
	}
	
	$scope.searchAttendee = function(id){
		for(var i=0;i<$scope.attendees.length;i++){
			if($scope.attendees[i].id == id){
				return $scope.attendees[i];
				break;
			}
		}
		return null;
	}
	
	$scope.exportToExcel=function(tableId){ 	
		console.dir($scope.stats);
        var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
        $timeout(function(){location.href=exportHref;},100); 
    }
});