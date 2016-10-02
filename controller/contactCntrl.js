
angular.module('bridgeApp').directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };
    return {
        link: fn_link
    }
}])

    .controller('contactCntrl', function ($scope, $http, fileServ, $interval, $rootScope) {
        $scope.codeStatus = "";
        $scope.show = false;
        $scope.loading = false;

        var formdata = new FormData();
        $scope.getTheFiles = function ($files) {
            fileServ.setFile($files)
        };
       
        // Validation for file upload
        $(document).ready(function () {
            $('input[type=file]').change(function () {
                var val = $(this).val().toLowerCase();
                var regex = new RegExp("(.*?).(pdf|doc|docx|odt)$");
                if (!(regex.test(val))) {
                    $(this).val('');
                    alert('Invalid Selection (Select Only pdf,doc,odt or docx Files)');
                }
            });
        })

        // Method after Submit Button Click
        $scope.submit = function () {
            $scope.loading = true;
            console.log('clicked');

            // Data in Contact form
            formData = {
                'name': this.name,
                'email': this.email,
                'number': this.cnumber,
                'message': this.message,
                'file': fileServ.getFile()
            };

            // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            $http.post('https://bridge941.herokuapp.com/setData', formData).success(function (response) {
                $scope.loading = false;
                console.log(response); // Getting Success Response in Callback
                document.getElementById("myForm1").reset();
                $scope.show = true;
                $interval(function () {
                    $scope.show = false;
                }, 8000);
            }).error(function (err) {
                console.log(err); // Getting Error Response in Callback
                // $scope.codeStatus = err ;
            });
            return false;
        }


        // Retrive model of attach window
        var attach = document.getElementById('attachwindow');
        // Display attach window
        $scope.showwindow = function () {
            attach.style.display = "block";
        }
        // Remove window
        $scope.removewindow = function () {
            attach.style.display = "none";
        }
    });

