/**
 * Created by geoffbrown1 on 2/22/16.
 */
var app = angular.module('artistService', []);

app.service('artistService', artistService);
artistService.$inject = ['userService'];

function artistService(userService)
{
  var as = this;
  as.id = '';
  as.id2 = '';
  as.currentArtist = '';
  as.bandPic = '';
  as.currentLikes = '';
  as.addLikes = addLikes;

  function addLikes(){

    var ref = new Firebase("https://musiquality.firebaseio.com/users/" + userService.user.uid);
    ref.push({Artist_Name: as.currentArtist, Artist_ID: as.id});

  }
}
