/**
 * Created by DanTutt on 2/29/16.
 */
var app = angular.module('myLikes', []);

app.controller('myLikesController', myLikesController);

myLikesController.$inject = ['$http', 'userService', '$scope', '$state', 'artistService'];

function myLikesController($http, userService, $scope, $state, artistService) {
// controller data and functions
  var ml = this;
  ml.artistService = artistService;
  ml.currentArtist = '';
  ml.popularity = '';
  ml.genre = '';
  ml.bandPic = '';
  ml.$http = $http;
  ml.artistStuff = artistStuff;
  ml.artistSearch = artistSearch;
  ml.deleteLike = deleteLike;
  ml.rating = rating;


  function artistSearch(artist) {
    $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function (response) {
      ml.currentArtist = response.data.artists.items[0].name;
      ml.bandPic = response.data.artists.items[0].images[1].url;
      ml.popularity = response.data.artists.items[0].popularity;
      ml.genre = response.data.artists.items[0].genres[0];
    });
    var mongoCall = '/api/rating?ArtistName=' + artist;
    ml.$http.get(mongoCall).then(function (response) {
      console.log(response.data);
      var artistRating = response.data;
      rating(artistRating, artist);
    });
  }

  function artistStuff(name, pic) {
    artistService.currentArtist = name;
    artistService.bandPic = pic;
    artistService.id = '';
    //$state.go('tabsController.artistHome', {}, {reload: true});
  }

  function deleteLike(artist) {
    // console.log(artist);
    ml.$http.post('/api/deleteLike', {ArtistName: artist});
  }

  function rating(rating, artist) {
    console.log(rating, artist);
    for(var i = 1; i < 6; i++) {
      var starRating = "#" + "star" + [i];
      console.log(starRating);
      $(starRating).removeClass("ion-ios-star-outline");
      $(starRating).removeClass("ion-ios-star");
      $(starRating).addClass("ion-ios-star-outline");
    }
    for(var j = 1; j <= rating; j++) {
      var starRating2 = "#" + "star" + [j];
      console.log(starRating2);
      $(starRating2).removeClass("ion-ios-star-outline");
      $(starRating2).addClass("ion-ios-star");
    }
    ml.$http.post('/api/rating', {rating: rating, ArtistName: artist});
  }
}
