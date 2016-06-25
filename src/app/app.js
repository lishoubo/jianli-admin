var jlApp = angular.module('jlApp', ['ngRoute']);

jlApp.constant('config', {
    host: 'http://localhost:8080'
});
jlApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);

jlApp.filter('range', function () {
    return function (n) {
        var res = [];
        for (var i = 0; i < n; i++) {
            res.push(i);
        }
        return res;
    };
});

jlApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/pages/staff/staff.html',
            controller: 'staffController'
        })
        .when('/building', {
            templateUrl: '/pages/building/list.html',
            controller: 'buildingController'
        })
        .when('/journal', {
            templateUrl: '/pages/journal/journal.html',
            controller: 'journalController'
        })
        .when('/journal/new', {
            templateUrl: '/pages/journal/form.html',
            controller: 'journalController'
        })
        .when('/baike', {
            templateUrl: '/pages/baike/list.html',
            controller: 'baikeController'
        })
        .when('/baike/new', {
            templateUrl: '/pages/baike/form.html',
            controller: 'baikeController'
        });
}]);



jlApp.controller('staffController', ['$scope', '$http', 'config', function ($scope, $http, config) {
    var result = {
        data: {
            page: 0,
            pageSize: 10,
            items: []
        }
    }, form = {};

    $scope.result = result;
    $scope.form = form;
    $scope.go_to_page = function (page) {
        if (!page) {
            page = 1;
        }
        if (page < 1 || (!!$scope.result.data.pageTotal && page >= $scope.result.data.pageTotal)) {
            return;
        }
        $http.get(
            config.host + "/api/admin/staffs",
            {'params': {'page': page, 'pageSize': 10}}
        ).success(function (response) {
            $scope.result.data = response.data;
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.add_staff = function () {
        $http.post(
            config.host + "/api/admin/staffs",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $(".modal").modal("hide");
                $scope.go_to_page(1);
            } else {
                bootbox.alert({
                        title: "添加失败",
                        message: response.message,
                        closable: true
                    }
                );
            }
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.go_to_page(1);
}]);

jlApp.controller('buildingController', ['$scope', '$http', 'config', function ($scope, $http, config) {
    var result = {
        data: {
            page: 0,
            pageSize: 10,
            items: []
        }
    }, form = {};

    $scope.result = result;
    $scope.form = form;
    $scope.go_to_page = function (page) {
        if (!page) {
            page = 1;
        }
        $http.get(
            config.host + "/api/admin/building",
            {'params': {'page': page, 'pageSize': 10}}
        ).success(function (response) {
            $scope.result.data = response.data;
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.add_building = function () {
        $http.post(
            config.host + "/api/admin/building",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $(".modal").modal("hide");
                $scope.go_to_page(1);
            } else {
                bootbox.alert({
                        title: "添加失败",
                        message: response.message,
                        closable: true
                    }
                );
            }
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.go_to_page(1);
}]);

jlApp.controller('journalController', ['$scope', function ($scope) {
    $scope.message = 'Look! I am an about page.';
}]);

jlApp.controller('baikeController', ['$scope', function ($scope) {
    $scope.message = 'Look! I am an about page.';
}]);

jlApp.controller('contactController', ['$scope', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
}]);