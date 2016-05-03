/**
 * Created by DanTutt on 2/24/16.
 */
var app = angular.module('feedback', []);

app.controller('FeedbackController', FeedbackController);
FeedbackController.$inject = ['$http', 'artistService', 'userService'];

function FeedbackController($http, artistService, userService) {
    // controller data and functions


    var fc = this;
    fc.hideAlert = hideAlert;
    fc.feedback = feedback;
    fc.messages = '';
    fc.name = '';
    fc.username = artistService.login;
    fc.$http = $http;


    function feedback() {
        if(fc.name == ''){
            fc.noName = true;
        }
        else if(fc.messages == ''){
            fc.noMessage = true;
        }
        else {
            userFeedback = fc.messages;
            userName = fc.name;
            console.log(userFeedback);

            fc.$http.post('/api/feedback', {
                UserFeedback: userFeedback,
                UserName: userName

            }).then(response => {
                console.log(response);
        });
            //var ref = new Firebase("https://musiquality.firebaseio.com/");
            //
            //var postsRef = ref.child("feedback");
            //
            //var newPostRef = postsRef.push();
            //newPostRef.set({
            //    UserName: userService.user.uid,
            //    Author: fc.name,
            //    Feedback: fc.messages
            //
            //
            //});
            fc.messageSent = true;
            fc.messages = '';
            fc.name = '';
        }
    }
    function hideAlert(){
        fc.messageSent = false;
        fc.noName = false;
        fc.noMessage = false;
    }
}