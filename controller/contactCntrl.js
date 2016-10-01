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

    .controller('contactCntrl', function ($scope, $http,fileServ) {
        $scope.codeStatus = "";
        $scope.show = false;

        var formdata = new FormData();
        $scope.getTheFiles = function ($files) {
        fileServ.setFile($files)
        };

        // Validation for file upload
        $(document).ready(function () {
        $('input[type=file]').change(function () {
            var val = $(this).val().toLowerCase();
            var regex  =  new RegExp("(.*?).(pdf|doc|docx)$");
            if(!(regex.test(val)))
            {
                $(this).val('');
                alert('Invalid Selection \(Select Only pdf,doc or docx Files)');
            }
        });
        })

        // Method after Submit Button Click
        $scope.submit = function () {
            console.log('clicked');

            // Data in Contact form
            formData = {
                    'name': this.name,
                    'email': this.email,
                    'number': this.cnumber,
                    'message': this.message,
                    'file' : fileServ.getFile()
                };
            console.log(formData)
         
            // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            $http.post('https://bridge941.herokuapp.com/setData', formData).success(function (response) {
                console.log(response); // Getting Success Response in Callback
                document.getElementById("myForm1").reset();
                $scope.show = true;

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

