angular.module('bridgeApp').controller('contactCntrl', function ($scope, $http) {
    $scope.codeStatus = "";
    $scope.msg = '';
    $scope.submit = function () {
        console.log('clicked');
        var formData = {
            'name': this.name,
            'email': this.email,
            'subject': this.subject,
            'profile': this.profile,
            'message': this.message
        };

        // Accessing the Angular $http Service to send data via REST Communication to Node Server.
        $http.post('https://bridge941.herokuapp.com/setData', formData).success(function (response) {
            // console.log(response); // Getting Success Response in Callback
            document.getElementById("myForm1").reset();
            $scope.msg = 'Message has been sent! Please check your email.';

        }).error(function (err) {
            console.log(err); // Getting Error Response in Callback
            // $scope.codeStatus = err ;
        });

        return false;


    }
});