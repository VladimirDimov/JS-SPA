(function () {
    'use strict';

    function notifier(toastr) {
        function processData(data) {
            var type = typeof (data);

            if (type == 'string') {
                return data;
            } else if (type == 'object') {
                var keys = Object.keys(data);
                var length = keys.length;
                var output = [];

                for (var i = 0; i < length; i++) {
                    if (keys[i] == 'modelState') {
                        var modelState = data[keys[i]];
                        var modelStateKeys = Object.keys(modelState);
                        for (var i = 0; i < modelStateKeys.length; i++) {
                            output.push(modelState[modelStateKeys[i]][0]);
                        }
                    } else {
                        output.push(data[keys[i]]);
                    }
                }

                return output.join(' ');
            }
        };

        return {
            success: function (data) {
                toastr.success(processData(data));
            },
            error: function (err) {
                toastr.error(processData(err));
            }
        };
    };

    angular.module('app.services')
        .service('notifier', ['toastr', notifier]);
} ());