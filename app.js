var app = angular.module('myapp', ['highchartsModule']);

app.controller('AppController', function($scope){
    // controller logic goes here
    $scope.title = 'something here';

    $scope.printTitle = function(){
        console.log($scope.title);
    }

    $scope.myLabelFormatter = function(){
        console.log('label formatter');
    }
});

