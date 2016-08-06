(function(){
 var app = angular.module("githubViewer",[]);

var MainController = function ($scope,$http) {
    var onUserComplete = function (response) {
            $scope.user = response.data;
    };

    var onError = function (reason) {
           $scope.error = "could not fetch the error" ;
    };

    $http.get("https://api.github.com/users/robconery")
          .then(onUserComplete,onError);
    $scope.message = "Hello, Angular";
};

    app.controller("MainController",["$scope","$http",MainController]);
}());