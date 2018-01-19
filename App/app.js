var app = angular.module('app',['ui.router','ui.router.state.events'])

app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state('login',{
            url:'/login',
            templateUrl:'App/View/login.html',
            controller:function($scope,$state,$http){
                $scope.loginName = '';
                $scope.loginPwd = '';
                $scope.getLogin = function(){
                    $http({
                        method:'get',
                        url:"http://localhost:3322/getData?name="+$scope.loginName+"&pwd="+$scope.loginPwd
                    }).then(function(data){
                        var sts = data.data.status;
                        //console.log(data)
                        if(sts == 4){
                            alert('登录成功')
                            $state.go('success')
                        }else if(sts == 1){
                            alert('账户名或密码错误')
                            $state.go('login')
                        }else if(sts == 0){
                            alert('请重新注册')
                            $state.go('regin')
                        }
                    },function(error){
                        console.log(error)
                    })
                }
            }
        })
        .state('regin',{
            url:'/regin',
            templateUrl:'App/View/regin.html',
            controller:function($scope,$state,$http){
                $scope.user1 = '';
                $scope.pwd1 = '';
                $scope.pwd2 = '';
                $scope.getRegin = function(){
                    if($scope.pwd1 === $scope.pwd2){
                        $http({
                            method:'get',
                            url:'http://localhost:3322/regin?name='+$scope.user1+'&pwd='+$scope.pwd1
                        }).then(function(result){
                            if(result.data === 'success'){
                                $state.go('login')
                            }else if(result.data === 'already'){
                                $state.go('regin')
                            }
                        })
                        if(true){
                            $state.go('login')
                        }else{
                            alert('密码不正确')
                        }
                    }
                }
            }
        })
        .state('success',{
            url:'/seccess',
            template:'<h1>成功</h1>'
        })
    $urlRouterProvider.otherwise('/login')
})