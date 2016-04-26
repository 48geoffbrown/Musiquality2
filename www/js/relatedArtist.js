/**
 * Created by bobnweave on 2/19/16.
 */
var app = angular.module('relatedArtist', []);

app.controller('RelatedArtistController', RelatedArtistController);

function RelatedArtistController($http, artistService, $state) {
  // controller data and functions
  var rc = this;
  rc.artist = '';
  rc.artistKey = '';
  rc.bandPic = '';
  rc.bandName = '';
  rc.results = '';
  rc.currentArtist = currentArtist;
  rc.artistSearch = artistSearch;

  function artistSearch(artist) {

    //first get request grabs the artist key
    $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function (response) {
      if (response.data.artists.items[0] === undefined) {
        rc.results = 'noGood';
      }
      else {
        rc.results = 'Good';
        rc.artistKey = response.data.artists.items[0].id;
        rc.bandPic = response.data.artists.items[0].images[1].url;
        rc.bandName = response.data.artists.items[0].name;
        artistService.currentArtist = artist;
        artistService.bandPic = rc.bandPic;
        artistService.bandName = rc.bandName;
        //second get request injects the artist key and returns the related artists information
        $http.get('https://api.spotify.com/v1/artists/' + rc.artistKey + '/related-artists').then(function (secondResponse) {
          rc.artistArray = secondResponse.data.artists;
          //sorts the array of artists in descending order based on artist popularity rating
          rc.artistArray.sort(function (a, b) {
            return parseFloat(b.popularity) - parseFloat(a.popularity);

          });

        });
      }
    });

  }

  function currentArtist(name, pic) {
    artistService.currentArtist = name;
    artistService.bandPic = pic;
    artistService.id = '';
    //$state.go('tabsController.artistHome');
  }

}




