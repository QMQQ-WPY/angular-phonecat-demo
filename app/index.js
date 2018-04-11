var phonecatApp = angular.module('phonecatApp', ['ngRoute', 'ngResource', 'ngAnimate'])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/phones', {
                    templateUrl: 'list.html',
                    controller: 'PhoneListCtrl'
                }).
                when('/phones/:phoneId', {
                    templateUrl: 'detail.html',
                    controller: 'PhoneDetailCtrl'
                }).
                otherwise({
                    redirectTo: '/phones'
                });
        }])
    // .factory('Phone', ['$resource',
    //     //将请求接口定义成一个服务，供controller使用
    //     function ($resource) {
    //         return $resource('phones/:phoneId.json', {}, {
    //             query: { method: 'GET', params: { phoneId: 'phones' }, isArray: true }
    //         });
    //     }])
    // .controller('PhoneListCtrl', ['$scope', 'Phone',
    //     function ($scope, Phone) {
    //         $scope.phones = Phone.query();
    //         $scope.orderProp = 'age';
    //     }])
    // .controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
    //     function ($scope, $routeParams, Phone) {
    //         $scope.phone = Phone.get({ phoneId: $routeParams.phoneId }, function (phone) {
    //             $scope.mainImageUrl = phone.images[0];
    //         });

    //         $scope.setImage = function (imageUrl) {
    //             $scope.mainImageUrl = imageUrl;
    //         };
    //     }])
    // .controller('PhoneListCtrl', ['$scope', '$http', function(){
    //     //直接用$http请求接口，此处会报错"$http is not defined"，采用显示注入依赖的声明方式
    //     $http.get('phones/phones.json').success(function(res){
    //         $scope.phones = res;
    //         $scope.orderProp = 'age';
    //     })
    // }])
    // .controller('PhoneDetailCtrl', ['$scope', '$http', '$routeParams', function(){
    //     //直接用$http请求接口，此处会报错"$http is not defined"，采用显示注入依赖的声明方式
    //     $http.get('phones/{{routeParams}}').success(function(res){
    //         $scope.mainImageUrl = res.images[0];
    //         $scope.setImage = function (imageUrl) {
    //             $scope.mainImageUrl = imageUrl;
    //         };
    //     })
    // }])
    .filter('checkmark', function () {
        return function (input) {
            return input ? '\u2713' : '\u2718';
        };
    })
    .animation('.phone', function () {

        var animateUp = function (element, className, done) {
            if (className != 'active') {
                return;
            }
            element.css({
                position: 'absolute',
                top: 500,
                left: 0,
                display: 'block'
            });

            jQuery(element).animate({
                top: 0
            }, done);

            return function (cancel) {
                if (cancel) {
                    element.stop();
                }
            };
        }

        var animateDown = function (element, className, done) {
            if (className != 'active') {
                return;
            }
            element.css({
                position: 'absolute',
                left: 0,
                top: 0
            });

            jQuery(element).animate({
                top: -500
            }, done);

            return function (cancel) {
                if (cancel) {
                    element.stop();
                }
            };
        }

        return {
            addClass: animateUp,
            removeClass: animateDown
        };
    }); 
//显示注入依赖的声明方式    
phonecatApp.controller('PhoneListCtrl', PhoneListCtrl);
PhoneListCtrl.$inject = ['$scope', '$http'];
function PhoneListCtrl($scope, $http) {
    $http.get('phones/phones.json').success(function (res) {
        $scope.phones = res;
        $scope.orderProp = 'age';
    })
};
phonecatApp.controller('PhoneDetailCtrl', PhoneDetailCtrl);
PhoneDetailCtrl.$inject = ['$scope', '$http', '$routeParams'];
function PhoneDetailCtrl($scope, $http, $routeParams ) {
    var detailUrl = 'phones/' + $routeParams.phoneId + '.json';
    $http.get(detailUrl).success(function (res) {
        $scope.phone = res;
        $scope.mainImageUrl = res.images[0];
        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    })
}