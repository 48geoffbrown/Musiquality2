/**
 * Created by DanTutt on 2/29/16.
 */
var app = angular.module('myLikes', []);

app.controller('myLikesController', myLikesController);

myLikesController.$inject = ['$http', 'userService','$scope', '$state', 'artistService'];

function myLikesController($http, userService, $scope, $state, artistService) {
// controller data and functions
    var ml = this;
    ml.artistService = artistService;
    ml.currentArtist = '';
    ml.popularity = '';
    ml.genre = '';
    ml.bandPic = '';
    ml.artistStuff = artistStuff;
    ml.artistSearch = artistSearch;


  function artistSearch(artist) {
    $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function (response) {
      ml.currentArtist = response.data.artists.items[0].name;
      ml.bandPic = response.data.artists.items[0].images[1].url;
      ml.popularity = response.data.artists.items[0].popularity;
      ml.genre = response.data.artists.items[0].genres[0];

    });
  }

    function artistStuff(name, pic){
        artistService.currentArtist = name;
        artistService.bandPic = pic;
        artistService.id = '';
        //$state.go('tabsController.artistHome', {}, {reload: true});
    }
}
