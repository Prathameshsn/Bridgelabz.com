angular.module('bridgeApp').controller('contactCntrl', function ($scope, $http,$timeout) {
    $scope.codeStatus = "";
    $scope.show = false;
    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
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
            $scope.loading = false;
            console.log(response); // Getting Success Response in Callback
            document.getElementById("myForm1").reset();
            $timeout(function(){
                $scope.show = true;
            },3000);
        }).error(function (err) {
            console.log(err); // Getting Error Response in Callback
            // $scope.codeStatus = err ;
        });

        return false;


    }
});