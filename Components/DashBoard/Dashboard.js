
app.component('noteList',{
    templateUrl:"Components/AddNotes/addNotes.html",
}).controller("DashboardCtrl",function($scope,$http,$window){
    
    var token=$window.localStorage.getItem("token");
    let headersConfig = {
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        } 
    }
    
    $scope.getAllTheNotes=function(){
        $http.get("https://localhost:44340/api/Note/AllNotes",headersConfig)
    .then((response1)=>{console.log(response1.data);
    $scope.AllNotesArray = response1.data;
    },(error)=>{ console.log(error)
    })

    }
    //-----Takenote one and two
    var note=this;
    note.toggle=false;
    $scope.showButtons = [0];
    $scope.toggle1 = function() {
      $scope.showButtons = [1];
  };

  $scope.postNote=function(title,note){

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
}; 
    /* console.log(token); */

})