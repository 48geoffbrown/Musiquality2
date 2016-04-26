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
        var ref = new Firebase(url);
        ref.authWithOAuthPopup('facebook', function (error, authData) {
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

        });
    }

    function googleLogin() {
        var ref = new Firebase(url);
        ref.authWithOAuthPopup('google', function (error, authData) {
            if (error) {
                console.log('Log in to Google Failed', error);
                vm.message = 'Log in to Facebook Failed. ' + error;
            } else {
                console.log('Logged in to Google');
                vm.message = 'Logged in to Google.';
                $timeout(function () { // invokes $scope.$apply()
                    //vm.fbData = authData;
                  userService.update();
                });
                vm.loggedIn = true;
            }
        });
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
}
