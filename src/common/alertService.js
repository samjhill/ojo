(function () {
    'use strict';

    angular.module('ngBoilerplate')
    .factory('alertService', alertService);

    function alertService($timeout) {
        var service = {
            add: add,
            closeAlert: closeAlert,
            closeAlertIdx: closeAlertIdx,
            clear: clear,
            get: get
        },
        alerts = [];

        return service;

        function add(type, msg) {
            var alert = {
                type: type,
                msg: msg,
                close: function() {
                    return closeAlert(this);
                }
            };
            $timeout(closeAlert, 2500, true, alert);
            return alerts.push(alert);
        }

        function closeAlert(alert) {
            return closeAlertIdx(alerts.indexOf(alert));
        }

        function closeAlertIdx(index) {
            return alerts.splice(index, 1);
        }

        function clear(){
            alerts = [];
        }

        function get() {
            return alerts;
        }
    }
})();