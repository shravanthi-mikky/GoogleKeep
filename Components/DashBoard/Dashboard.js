//var app=angular.module("FundooApp",[]);

app.component('archiveList', {
  templateUrl: "Components/Archive/Archive.html",
});

app.component('pinnedList', {
  templateUrl: "Components/PinnedNotes/PinnedNotes.html",
});

app.component('trashList', {
  templateUrl: "Components/Trash/TrashNotes.html",
});

app.component('sideList', {
  templateUrl: "Components/DashBoard/SideNavbar/sideNav.html",
});



app.component('noteList', {
  templateUrl: "Components/AddNotes/addNotes.html",

}).controller("DashboardCtrl", function ($scope, $http, $window, $uibModal) {

  $scope.colorArray = ["LightSalmon", "Pink", "PapayaWhip", "Khaki", "Lavender", "Thistle", "GreenYellow", "Aquamarine", "BlanchedAlmond", "Gainsboro", "AliceBlue"]
  $scope.collabView = [0];
  $scope.collabNote = 0;
  $scope.collabData = [];

  var token = $window.localStorage.getItem("token");
  let headersConfig = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }

  $scope.pop = [0];
  $scope.popper = function (noteID) {
    noteToTrash = noteID
    if ($scope.pop.includes(0)) {
      $scope.pop = [1];
    }
    else {
      $scope.pop = [0];
    }
  };


  //-----Takenote one and two
  var note = this;
  note.toggle = false;
  $scope.showButtons = [0];
  $scope.toggle1 = function () {
    $scope.showButtons = [1];
  };

  $scope.colorPop = [0];
  $scope.colorPopup = function () {
    if ($scope.colorPop.includes(0)) {
      $scope.colorPop = [1];

    }
    else {
      $scope.colorPop = [0]
    }
  };

  $scope.Collborator = [0];
  $scope.collaboratorPopup = function (noteID) {
    if ($scope.Collborator.includes(0)) {
      $scope.Collborator = [1]
    }
    else {
      $scope.Collborator = [0]
    }
    $scope.collabNote = noteID
  };

  $scope.setCollab = function (collabEmail) {
    var data1 = {
      noteid: $scope.collabNote,
      email: collabEmail
    }
    console.log("entered into setcollab function");
    $http.post("https://localhost:44340/Add", JSON.stringify(data1), headersConfig)
      .then(function (response) {
        console.log(response)
      }, function (error) {
        console.log(error)
      })
    $scope.Collaborator = [0]
  }

  $scope.getAllTheNotes = function () {
    $http.get("https://localhost:44340/api/Note/byUserid", headersConfig)
      .then((response1) => {
        console.log(response1.data);
        $scope.AllNotesArray = response1.data;
      }, (error) => {
        console.log(error)
      })

    //collab
    $http.get("https://localhost:44340/Get", headersConfig)
      .then(function (response) {
        console.log(response);
        $scope.collabArray = response.data.data
        angular.forEach($scope.collabArray, function (id) {
          console.log(id);
          console.log("noteId :" + $scope.collabArray.noteId);
          $http.get(`https://localhost:44340/api/Note/byNoteId?noteId=${$scope.collabArray.noteId}`, headersConfig)
            .then(function (response) {
              console.log("Response of collab :")
              console.log(response);
              $scope.collabData.push(response.data.data[0])
            }, function (error) {
              console.log(error)
            })
        });
      }, function (error) {
        console.log(error)
      })
  }
  $scope.changeColor = function (noteID, color) {
    $http.put(`https://localhost:44340/api/Note/${noteID}/Color?color=${color}`, null, headersConfig)
      .then(function (response) {
        console.log(response)
      }, function (error) {
        console.log(error)
      })
    window.location.reload()
  };

  //For Archive
  $scope.ToArchive = function (noteID) {
    $scope.noteID = noteID;
    console.log($scope.noteID);
    $http.put(`https://localhost:44340/api/Note/${noteID}/IsArchive`, null, headersConfig)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      }, function (error) {
        console.log(error)
      })
  };

  $scope.openModal = function (noteID, title, note, color, image, isArchive, isPin, isTrash) {
    user = {
      noteID: noteID,
      title: title,
      note: note,
      color: color,
      image: image,
      isArchive: isArchive,
      isPin: isPin,
      isTrash: isTrash,
    }
    $scope.modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'window.html',
      controller: 'ModelHandlerController',
      controllerAs: '$ctrl',
      size: 'sm',
      resolve: {
        user: function () {
          return user;
        }
      }
    });

  }


  //Update note
  $scope.UpdateNote = function (noteID, title, note, color, isArchive, isPin, isTrash) {

    var data1 = {
      noteID: noteID,
      title: title,
      note: note,
      color: color,
      isArchive: isArchive,
      isPin: isPin,
      isTrash: isTrash
    }
    //call the service

    $http.put(`https://localhost:44340/api/Note/${noteID}/Update`, JSON.stringify(data1), headersConfig)
      .then(function (response) {
        console.log(response);
        if (response.data1) {
          window.location.reload();
          $scope.title = response.data1.title;
          $scope.note = response.data1.note;
          $scope.color = response.data1.color;
          $scope.image = response.data1.image;
          $scope.isArchive = response.data1.isArchive;
          $scope.isPin = response.data1.isPin;
          $scope.isTrash = response.data1.isTrash;

          $uibModalInstance.close('save');
        }
      }, function (error) {
        console.log(error)
      })
  };
  //For Delete
  $scope.deleteNote = function (noteID) {
    var datanote = {
      noteID: noteID
    }
    $scope.noteID = noteID;
    console.log($scope.noteID);
    $http.delete(`https://localhost:44340/api/Note/${noteID}/Remove`, headersConfig)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      }, function (error) {
        console.log(error)
      })
    }


    //For Trash
    $scope.ToTrash = function (noteID) {
      var datanote = {
        noteID: noteID
      }
      $scope.noteID = noteID;
      console.log($scope.noteID);
      $http.put(`https://localhost:44340/api/Note/${noteID}/IsTrash`, null, headersConfig)
        .then(function (response) {
          console.log(response);
          window.location.reload();
        }, function (error) {
          console.log(error)
        })
    };

    $scope.postNote = function (title, note) {
      var token = $window.localStorage.getItem("token");
      console.log(token);
      let headersConfig = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
      var data = {
        title: title,
        note: note,
        userId: ''
      }
      //call the service
      $http.post("https://localhost:44340/api/Note/Add", JSON.stringify(data), headersConfig)
        .then(function (response) {
          console.log(response);

          if (response.data) {
            $scope.msg = "Post Data Submitted";
            $window.alert("Notes Created!");
            $scope.title = response.data.title;
            $scope.note = response.data.note;
            window.location.reload();
          }
        }, function (error) {
          console.log(error)
        })
    };

    //collab

    $scope.CollabNote = function (collabEmail, noteid)
    {

      var data1 = {
        collabEmail: collabEmail,
        noteid: noteid
      }
      $scope.setCollab = function (collabEmail) {
        var data1 = {
          noteid: noteid,
          email: collabEmail
        }
        console.log("entered into setcollab function");
        $http.post("https://localhost:44340/Add", JSON.stringify(data1), headersConfig)
          .then(function (response) {
            console.log(response)
          }, function (error) {
            console.log(error)
          })
        $scope.Collaborator = [0]
      }
      $scope.refreshWindow = function () {
        window.location.reload();
      }
      
    };
  })

// update ctrl

app.controller("ModelHandlerController", function ($scope, $uibModalInstance) {
  $scope.noteID = user.noteID;
  $scope.title = user.title;
  $scope.note = user.note;
  $scope.color = user.color;
  $scope.isArchive = user.isArchive;
  $scope.isPin = user.isPin;
  $scope.cancelModal = function () {
    console.log("cancelmodal");
    $uibModalInstance.dismiss('close');
  }
  $scope.ok = function () {
    $uibModalInstance.close('save');

  }

});

//Collab ctrl
app.controller("CollabController", function ($scope, $uibModalInstance, $http) {
  $scope.collabEmail = user.collabEmail;
  $scope.noteid = user.noteid;
  $scope.cancelModal = function () {
    console.log("cancelmodal");
    $uibModalInstance.dismiss('close');
  }
  $scope.ok = function () {

    $uibModalInstance.close('save');

  }

});