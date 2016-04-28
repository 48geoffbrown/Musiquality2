/**
 * Created by geoffbrown1 on 2/17/16.
 */
var app = angular.module('login', ['ngStorage']);
app.config(['$localStorageProvider',
    function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('');
    }]);
app.controller('MainController', MainController);
MainController.$inject = ['$timeout', '$localStorage', 'userService'];
function MainController($timeout, $localStorage, userService) {
    // controller data and functions
    var vm = this;
    vm.facebookLogin = facebookLogin;
    vm.googleLogin = googleLogin;

    //vm.deleteFacebookData = deleteFacebookData;
    //vm.fbData = $localStorage['firebase:session::musiquality'];
    // if facebook data is found in local storage, use it
    //vm.message = vm.fbData && vm.fbData.facebook ? "Logged in to Facebook." : "No Facebook data found.";
    // IMPORTANT: change to match the URL of your Firebase.
    var url = 'https://musiquality.firebaseio.com/';

    // use Firebase library to login to facebook
    function facebookLogin() {
        location.href = 'http://localhost:8100/auth/facebook';
        //var ref = new Firebase(url);
        //ref.authWithOAuthPopup('facebook', function (error, authData) {
            if (error) {
                console.log('Log in to Facebook Failed', error);
                vm.message = 'Log in to Facebook Failed. ' + error;
            } else {
                console.log('Logged in to Facebook');
                vm.message = 'Logged in to Facebook.';
                $timeout(function () { // invokes $scope.$apply()
                    //vm.fbData = authData;
                  userService.update();
                });
                vm.loggedIn = true;

            }
        //
        //});
    }

    function googleLogin() {
        console.log('worked');
        location.href = 'http://localhost:8100/auth/google';
        if (error) {
            console.log('Log in to Facebook Failed', error);
            vm.message = 'Log in to Facebook Failed. ' + error;
        }
        else {
            console.log('Logged in to Facebook');
            vm.message = 'Logged in to Facebook.';
            $timeout(function () { // invokes $scope.$apply()
                //vm.fbData = authData;
                userService.update();
            });
            vm.loggedIn = true;
        }

        // this removes facebook data from local storage
        // to FULLY logout, you MUST go to facebook.com and logout
        //function deleteFacebookData() {
        //  $localStorage.$reset();
        //  vm.fbData = {};
        //  vm.message = 'Facebook data deleted.';
        //}
        // bug alert: this delete function sometimes does NOT reset the local storage,
        // so a page refresh finds facebook data in localstorage.
    }}
// function MainCtrl($http) {
// 	this.$http = $http;
// 	this.greeting = 'VHS Store';
// 	this.movies = [];
// 	this.searchText = '';
// }
//
// MainCtrl.prototype.sayHi = function() {
// 	console.log(this.greeting);
// };

/**
 * Used for both checking out a movie and checking in.
 * The server will need to check the "checkedOut" property of the movie.
 */
// MainCtrl.prototype.checkOut = function(movie) {
// 	console.log('checkout', movie);
// 	this.$http.post('/api/checkout', movie).then(response => {
// 		console.log('checked out movie');
// 		this.search(this.searchText);
// 	}).catch(error => {
// 		console.log('movie already checked out');
// 		this.search(this.searchText);
// 	});
// };

// MainCtrl.prototype.removeMovie = function(movie) {
// 	console.log('remove', movie);
// 	this.$http.post('/api/removemovie', movie).then(response => {
// 		console.log('movie removed', response);
// 		this.search(this.searchText);
// 	});
// };
//
// MainCtrl.prototype.search = function(text) {
// 	if (text === undefined || text === '') {
// 		console.log('list all movies');
// 		this.$http.get('/api/movies').then(response => {
// 			console.log('api movies', response.data);
// 			this.movies = response.data;
// 		});
// 	} else {
// 		console.log('search for movies:', text);
// 		this.$http.get(`/api/searchmovie/${text}`).then(response => {
// 			console.log('api movie', response.data);
// 			this.movies = response.data;
// 		});
// 	}
// };
//
// MainCtrl.prototype.saveMovie = function(title, year) {
// 	console.log('save movie', title, year);
//
// 	this.$http.post('/api/savemovie', {
// 		title: title,
// 		year: year,
// 		checkedOut: false
// 	}).then(response => {
// 		console.log('saved movie', response);
// 		this.search('');
// 	});
// };
