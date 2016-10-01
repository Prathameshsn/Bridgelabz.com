
angular.module('bridgeApp').service('fileServ',function() { 
    var File;

    return {
        setFile : function (file) {
            File = file;
        },

        getFile : function () {
          return File;  
        }
    }

})