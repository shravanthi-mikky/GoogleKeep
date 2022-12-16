var app=angular.module("FundooApp",['ngRoute','ngStorage']);

 app.config(["$routeProvider",function($routeProvider){

$routeProvider.
when("/Login",{
    templateUrl:"Components/Login/Login.html",
    controller:"loginCtrl"
}).
when("/Register",{
    templateUrl:"Components/Register/Register.html",
    controller:"registerCtrl"
}).
when("/Dashboard",{
    templateUrl:"Components/DashBoard/Dashboard.html",
    controller:"DashboardCtrl"
}).
when("/Notes",{
    templateUrl:"Components/DashBoard/Dashboard.html",
    controller:"DashboardCtrl"
}).
when("/Trash",{
    templateUrl:"Components/Trash/TrashNotes.html",
    controller:"DashboardCtrl"
}).
when("/Archive",{
    templateUrl:"Components/Archive/Archive.html",
    controller:"DashboardCtrl"
}).
otherwise({
redirectTo:"/Login"
});
}]); 
/* app.controller("fundooappCtrl",function($scope,$http,$window,$location,$localStorage){
      //-----Takenote one and two
      var note=this;
      note.toggle=false;
      $scope.showButtons = [0];
      $scope.toggle1 = function() {
        $scope.showButtons = [1];

    }; */





    /* $scope.postNote=function(title,note){

        var token=$window.localStorage.getItem("token");
        console.log(token);
        
       let headersConfig = {
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        } 
    }
    var data={
        title: title,
        note: note,
        userId:''
      }
        //call the service
        $http.post("https://localhost:44340/api/Note/Add",JSON.stringify(data), headersConfig)
        .then(function(response){
            console.log(response);
    
            if(response.data){
                $scope.msg="Post Data Submitted";
                $window.alert("Notes Created!");
                $scope.title=response.data.title;
                $scope.note=response.data.note;
            }
        },function(error){
            console.log(error)
        })
    }; */ 
   //Login js-------------------------------------------------
   /*  $scope.login=function(email, password){
        var data={
            email:email,
            password:password
        }
        //call the service
        $http.post("https://localhost:44340/Login",JSON.stringify(data))
        .then(function(response){
            console.log(response);

            if(response.data){
                $window.localStorage.setItem('token', response.data.token);
                // $localStorage.message=response.data.token; 
                // console.log($localStorage.message); 
                $location.path('/Dashboard');
                $scope.email=response.data.email;
                $scope.password=response.data.password;
            }
        },function(error){
            console.log(error)
        })
    };  */

    /* var token=$window.localStorage.getItem("token");
    console.log(token);
    
   let headersConfig = {
    headers:{
        Authorization:"Bearer "+localStorage.getItem("token")
    } 
}
    $http.get("https://localhost:44340/api/Note/AllNotes",headersConfig)
    .then((response)=>{console.log(response);$window.localStorage.setItem('Notes', response.data);},(error)=>{ console.log(error)
    })
 */
    /* register.js */
    /*  $scope.postdata=function(firstName,lastName,email, password){
        var data={
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        }
        //call the service
        $http.post("https://localhost:44340/Register",JSON.stringify(data))
        .then(function(response){
            console.log(response);
            if(response.data){
                $scope.msg="Post Data Submitted";
                $scope.firstName=response.data.firstName;
                $scope.lastName=response.data.lastName;
                $scope.email=response.data.email;
                $scope.password=response.data.password;
            }
        },function(error){
            console.log(error)
        })
    };  */

    

/* }) */
        