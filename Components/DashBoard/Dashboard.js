//var app=angular.module("FundooApp",[]);

app.component('archiveList',{
    templateUrl:"Components/Archive/Archive.html",
});

app.component('pinnedList',{
    templateUrl:"Components/PinnedNotes/PinnedNotes.html",
});

app.component('trashList',{
    templateUrl:"Components/Trash/TrashNotes.html",
});

app.component('sideList',{
    templateUrl:"Components/DashBoard/SideNavbar/sideNav.html",
});



app.component('noteList',{
    templateUrl:"Components/AddNotes/addNotes.html",

}).controller("DashboardCtrl",function($scope,$http,$window,$uibModal){
    var colorArray = ["red", "blue","Black","green","voilet","Yellow","Pink"];
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

//For Archive
$scope.ToArchive=function(noteID){
    var datanote={
        noteID: noteID
      }
      $scope.noteID=noteID;
      console.log( $scope.noteID);
    $http.put(`https://localhost:44340/api/Note/${noteID}/IsArchive`,null,headersConfig)
    .then(function(response){
        console.log(response);
       window.location.reload();  
    },function(error){
        console.log(error)
    })
  };
      
  $scope.openModal = function(noteID,title,note,color,image,isArchive,isPin,isTrash){
    user={
      noteID:noteID,
        title:title,
        note:note,
        color:color,
        image:image,
        isArchive:isArchive,
        isPin:isPin,
        isTrash:isTrash,
    }
    $scope.modalInstance = $uibModal.open({
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-body',
    templateUrl: 'window.html',
    controller :'ModelHandlerController',
    controllerAs: '$ctrl',
    size: 'sm',
    resolve: {
    user:function(){
      return user;
    }
    }
    });
   
    }
    
  
    //Update note
    $scope.UpdateNote=function(noteID,title,note,color,isArchive,isPin,isTrash){
       
      var data1={
        noteID:noteID,
        title:title,
        note:note,
        color:color,
        isArchive:isArchive,
        isPin:isPin,
        isTrash:isTrash
      }
      //call the service
      
      $http.put(`https://localhost:44340/api/Note/${noteID}/Update`,JSON.stringify(data1),headersConfig)
      .then(function(response){
          console.log(response);
          if(response.data1){
            window.location.reload();
              $scope.title=response.data1.title;
              $scope.note=response.data1.note;
              $scope.color=response.data1.color;
              $scope.image= response.data1.image;
              $scope.isArchive= response.data1.isArchive;
              $scope.isPin= response.data1.isPin;
              $scope.isTrash= response.data1.isTrash;
  
              $uibModalInstance.close('save');
          }
      },function(error){
          console.log(error)
      })
  };
//For Delete
$scope.deleteNote=function(noteID){
    var datanote={
        noteID: noteID
      }
      $scope.noteID=noteID;
      console.log( $scope.noteID);
    $http.delete(`https://localhost:44340/api/Note/${noteID}/Remove`,headersConfig)
    .then(function(response){
        console.log(response); 
       window.location.reload(); 
    },function(error){
        console.log(error)
    })
  };

      
//For Trash
$scope.ToTrash=function(noteID){
    var datanote={
        noteID: noteID
      }
      $scope.noteID=noteID;
      console.log( $scope.noteID);
    $http.put(`https://localhost:44340/api/Note/${noteID}/IsTrash`,null,headersConfig)
    .then(function(response){
        console.log(response); 
       window.location.reload();
    },function(error){
        console.log(error)
    })
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
            window.location.reload();
        }
    },function(error){
        console.log(error)
    })
}; 

})

// update ctrl

app.controller("ModelHandlerController",function($scope,$uibModalInstance){
  $scope.noteID=user.noteID;
    $scope.title=user.title;
    $scope.note=user.note;
    $scope.color=user.color;
    $scope.isArchive=user.isArchive;
    $scope.isPin=user.isPin;
     $scope.cancelModal = function(){
     console.log("cancelmodal");
     $uibModalInstance.dismiss('close');
     }
     $scope.ok = function(){
     $uibModalInstance.close('save');
     
     }
     
    });