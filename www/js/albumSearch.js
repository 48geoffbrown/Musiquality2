var app = angular.module('albumSearch', []);

app.controller('AlbumController', AlbumController);

function AlbumController($http, artistService, $state) {
  // controller data and functions
  var ac = this;
  ac.album = '';
  ac.bandPic = '';
  ac.results = '';
  ac.results2 = '';
  //ac.results3 = '';
  ac.albumSearch = albumSearch;
  ac.currentArtist = currentArtist;
  //ac.hideAlert = hideAlert;

  function albumSearch(album) {
    $http.get('https://api.spotify.com/v1/search?q=' + album + '&type=album').then(function (response) {
      ac.results = response.data.albums.items;
      if (ac.results[0] === undefined) {
        ac.results2 = 'noGood';
      }
      else {
        ac.results2 = 'Good';
      }
      //if(ac.results == '') {
      //    ac.noResults = true;
      //}
    });
  }

  function currentArtist(id) {
    artistService.id = id;
    $state.go('tabsController.artistHome');
  }

  //function hideAlert(){
  //    ac.noResults = false;
  //}
}



