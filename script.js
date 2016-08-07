(function () {
    var app = angular.module("githubViewer", []);

    var MainController = function ($scope, $http, $interval) {
        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };
        var onRepos = function (response) {
            $scope.repos = response.data;
        };
        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1)
                $scope.search($scope.username);
        };
        var countdownInterval = null;
        var startCountDown = function () {
            countdownInterval =   $interval(decrementCountdown, 1000, $scope.countdown)
        };

        var onError = function (reason) {
            $scope.error = "could not fetch the error";
        };
        $scope.search = function (username) {
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
            if(countdownInterval){
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        $scope.username = "angular";
        $scope.message = "Hello, Angular";
        $scope.countdown = 5;
        startCountDown();

    };

    app.controller("MainController", MainController);
}());