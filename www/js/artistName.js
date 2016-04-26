/**
 * Created by geoffbrown1 on 2/18/16.
 */
var app = angular.module('artistName', []);

app.controller('NameController', NameController);

NameController.$inject = ['$http', 'artistService', '$state'];

function NameController($http, artistService, $state) {
  var nc = this;
  nc.artist = '';
  nc.results = '';
  nc.results2 = '';
  nc.artistSearch = artistSearch;
  nc.currentArtist = currentArtist;
  nc.hideAlert = hideAlert;

  function artistSearch(artist) {
    $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function (response) {
      nc.results = response.data.artists.items;
      if (nc.results[0] === undefined) {
        nc.results2 = 'noGood';
      }
      else {
        nc.results2 = 'Good';
      }
      //if(nc.results == '') {
      //  nc.noResults = true;
      //}

      //console.log(artistService.login);

    });
  }

  function currentArtist(name, pic) {
    artistService.currentArtist = name;
    artistService.bandPic = pic;
    artistService.id = '';
    //$state.go('tabsController.artistHome');
  }

  function hideAlert() {
    nc.noResults = false;
  }
}

