var app= angular.module("FundooApp",['ngStorage']);

app.controller("fundooappCtrl",function($scope,$http,$localStorage,$location){
    $scope.email=null;
    $scope.password=null;

    $scope.login=function(email, password){
        var data={
            email:email,
            password:password
        }
        //call the service
        $http.post("https://localhost:44340/Login",JSON.stringify(data))
        .then(function(response){
            console.log(response);

            if(response.data){

                $localStorage.message = response.data.token;
                console.log($localStorage.message);
                $location.path('/Dashboard');
                $scope.email=response.data.email;
                $scope.password=response.data.password;
            }
        },function(error){
            console.log(error)
        })
    };
})