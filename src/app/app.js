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
            templateUrl: '/pages/building/building.html',
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
    $scope.result = {
        data: {
            page: 0,
            pageSize: 10,
            items: []
        }
    };
    $scope.form = {};

    $scope.go_to_page = function (page) {
        if (!page) {
            page = 1;
        }
        $http.get(
            config.host + "/api/admin/staffs",
            {'params': {'page': page, 'pageSize': 10}}
        ).success(function (response) {
            console.log(response);
            if (response.success) {
                $scope.result.data = response.data;
            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );
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
    $scope.delete_staff = function (id) {
        bootbox.confirm("确定删除吗?", function (confirmed) {
            if (confirmed) {
                $http.post(
                    config.host + "/api/admin/staffs/delete?id=" + id
                ).success(function (response) {
                    if (response.success) {
                        $scope.go_to_page(1);
                    } else {
                        bootbox.alert({
                                title: "删除失败", message: response.message, closable: true
                            }
                        );
                    }
                }).error(function (error) {
                    bootbox.alert({
                            title: "删除失败", message: error, closable: true
                        }
                    );
                });
            }
        });
    };
    $scope.update_staff = function () {
        $http.post(
            config.host + "/api/admin/staffs/update",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $("#update-staff-modal").modal("hide");
                $scope.go_to_page(1);
            } else {
                bootbox.alert({
                        title: "更新失败", message: response.message, closable: true
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "更新失败", message: error, closable: true
                }
            );
        });
    };
    $scope.open_add_form = function () {
        $scope.form = {};
        $("#add-staff-modal").modal("show");
    };
    $scope.open_update_form = function (id) {
        $http.get(
            config.host + "/api/admin/staffs/queryById?id=" + id
        ).success(function (response) {
            if (response.success) {
                $scope.form = response.data;
                $("#update-staff-modal").modal("show");
            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );

        });
    };
    $scope.go_to_page(1);
}]);

jlApp.controller('buildingController', ['$scope', '$http', 'config', function ($scope, $http, config) {
    $scope.result = {
        data: {
            page: 0,
            pageSize: 10,
            items: []
        }
    };
    $scope.form = {"address": {"distinct": "西湖区"}};

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
    $scope.open_update_building = function (id) {
        $http.get(
            config.host + "/api/admin/building/queryById?id=" + id
        ).success(function (response) {
            if (response.success) {
                $scope.form = response.data;
                $("#update-building-modal").modal("show");
            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );

        });
    };
    $scope.open_add_building = function () {
        $scope.form = {"address": {"district": "西湖区"}};
        $("#add-building-modal").modal("show");
    };
    $scope.add_building = function () {
        $http.post(
            config.host + "/api/admin/building",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $("#add-building-modal").modal("hide");
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
    $scope.update_building = function () {
        $http.post(
            config.host + "/api/admin/building/update",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $("#update-building-modal").modal("hide");
                $scope.go_to_page(1);
            } else {
                bootbox.alert({
                        title: "更新失败",
                        message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "更新失败",
                    message: error
                }
            );
        });
    };
    $scope.delete_building = function (id) {
        bootbox.confirm("确定删除吗?", function (confirmed) {
            if (confirmed) {
                $http.post(
                    config.host + "/api/admin/building/delete?id=" + id
                ).success(function (response) {
                    if (response.success) {
                        $scope.go_to_page(1);
                    } else {
                        bootbox.alert({
                                title: "删除失败", message: response.message, closable: true
                            }
                        );
                    }
                }).error(function (error) {
                    bootbox.alert({
                            title: "删除失败", message: error, closable: true
                        }
                    );
                });
            }
        });
    };
    $scope.go_to_page(1);
}]);

jlApp.controller('journalController', ['$scope', function ($scope) {
    $scope.message = 'Look! I am an about page.';
}]);

jlApp.controller('baikeController', ['$scope', '$http', '$location', 'config', function ($scope, $http, $location, config) {
    $scope.form = {"procedure": "PREPARE"};

    $scope.add_baike = function () {
        var content = $('#baike-editor').summernote('code');
        $scope.form.content = content;
        $http.post(
            config.host + "/api/admin/baike",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $location.path("/baike");
            } else {
                bootbox.alert({
                        title: "添加失败",
                        message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "添加失败",
                    message: error
                }
            );
        });
    };

}]);

jlApp.controller('contactController', ['$scope', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
}]);