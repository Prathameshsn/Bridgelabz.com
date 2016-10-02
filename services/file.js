
angular.module('bridgeApp').service('fileServ',function() { 
    var File;

    return {
        setFile : function (file) {
            File = file;
            console.log("type"+File[0].webkitRelativePath)
        },

        getFile : function () {
                return File; 
        }
    }

})