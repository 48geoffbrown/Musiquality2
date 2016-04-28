/**
 * Created by geoffbrown1 on 2/22/16.
 */
var app = angular.module('artistService', []);

app.service('artistService', artistService);
artistService.$inject = ['$http'];

function artistService($http)
{
  var as = this;
  as.id = '';
  as.userId = '';
  as.id2 = '';
  as.currentArtist = '';
  as.bandPic = '';
  as.currentLikes = '';
  as.addLikes = addLikes;
  as.$http = $http;


  function addLikes(){
    artistName = as.currentArtist;
      console.log('save like', artistName);

      as.$http.post('/api/like', {
        ArtistName: artistName

      }).then(response => {
        console.log('saved like', response);
      });

  }
}

//var ref = new Firebase("https://musiquality.firebaseio.com/users/" + userService.user.uid);
//ref.push({Artist_Name: as.currentArtist, Artist_ID: as.id});

