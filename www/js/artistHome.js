/**
 * Created by geoffbrown1 on 2/22/16.
 */
var app = angular.module('artistHome', []);

app.controller('ArtistHomeController', ArtistHomeController);

//ArtistHomeController.$inject = ['artistService'];

function ArtistHomeController($http, $filter, artistService) {
  var ah = this;
  ah.artistService = artistService;
  //ah.artist = artistService.currentArtist;
  //ah.bandPic = artistService.bandPic;
  ah.news = '';
  ah.bio = '';
  ah.trackResults = '';
  ah.artistSearch = artistSearch;
  ah.amazonPage = amazonPage;
  ah.lyricsPage = lyricsPage;
  ah.outsidePage = outsidePage;
  ah.songPlay = songPlay;
  ah.songPause = songPause;
  ah.tracks = tracks;
  ah.albums = albums;
  ah.songLyrics = songLyrics;
  ah.buyAlbum = buyAlbum;
  ah.buyTrack = buyTrack;
  ah.aboutTheArtist = aboutTheArtist;
  ah.news = news;
  ah.wiki = wiki;
  ah.likesPage = likesPage;
  ah.audioObject = null;
  ah.bandClicked = false;
  ah.albumClicked = false;
  ah.newsClicked = false;


  function tracks (artist) {
    $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=track').then(function (response) {
      ah.trackResults = response.data.tracks.items;
      //sorts trackResults based on popularity
      ah.trackResults.sort(function (a, b) {
        return parseFloat(b.popularity) - parseFloat(a.popularity);
      });
      //image = response.data.tracks.items[0].album.images[1].url;
      console.log(ah.trackResults);
      //toggles between showing and hiding
      ah.bandClicked = !ah.bandClicked;
    });
  }

  function albums(artist){
    $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=album').then(function (response) {
      ah.albumResults = response.data.albums.items;
      //toggles between showing and hiding
      ah.albumClicked = !ah.albumClicked;
    });
  }




  function artistSearch(artist) {
    $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function (response) {
      ah.bandPic = response.data.artists.items[0].images[1].url;
      ah.bandName = response.data.artists.items[0].name;
      ah.bandNameCap = $filter('uppercase')(ah.bandName);
      $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=track').then(function (response) {
        ah.track1 = response.data.tracks.items[0].preview_url;
        ah.track2 = response.data.tracks.items[1].preview_url;
        ah.track3 = response.data.tracks.items[2].preview_url;
        ah.track1Name = response.data.tracks.items[0].name;
        ah.track2Name = response.data.tracks.items[1].name;
        ah.track3Name = response.data.tracks.items[2].name;
        ah.news = 'http://www.billboard.com/search/site/' + artist + '?f[0]=ss_bb_type%3Aarticle';
        ah.bio = 'https://en.wikipedia.org/wiki/' + artist;
        artistService.currentArtist = artist;
        artistService.bandPic = ah.bandPic;
        artistService.bandName = ah.bandName;
      });
    });
  }

  function songLyrics(artist, song){
    window.open('http://search.azlyrics.com/search.php?q=' + artist + ' ' + song + '+');
  }

  function buyAlbum(artist, album){
    window.open('https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Ddigital-music&field-keywords=' + artist + ' ' + album);
  }

  function buyTrack(artist, track){
    window.open('https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Ddigital-music&field-keywords=' + artist + ' ' + track);
  }

  function aboutTheArtist(){
    ah.newsClicked = !ah.newsClicked;
  }

  function wiki(artist){
    window.open('https://en.wikipedia.org/wiki/' + artist)
  }

  function news(artist){
    window.open('http://www.rollingstone.com/search?q=' + artist)
  }

  function lyricsPage(track) {
    window.open('http://search.azlyrics.com/search.php?q=' + track + '+' + ah.artist, '_blank', 'location=yes');
  }

  function amazonPage(track) {
    window.open('http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Ddigital-music&field-keywords=' + ah.artist + '+' + track, '_blank', 'location=yes');
  }

  function outsidePage(url) {
    window.open(url, '_blank', 'location=yes');
  }

  function songPlay(song) {
    if (ah.audioObject !== null) {
      ah.audioObject.pause();
      ah.audioObject = new Audio(song);
      ah.audioObject.play();
    }
    else{
      ah.audioObject = new Audio(song);
      ah.audioObject.play();
    }
  }

  function songPause() {
    ah.audioObject.pause();
  }
  function likesPage() {
    artistService.addLikes();
  }
}
