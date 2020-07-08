var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'pages/loginpage.html'
	})
	.when('/home', {
		resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				}
			}
		},
		templateUrl: 'pages/homepage.html'
	})
	.when('/details', {
		resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				}
			}
		},
		templateUrl: 'pages/detailspage.html'
	})
	.when('/aboutMe',{
		resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				}
			}
		},
		templateUrl: 'pages/aboutmepage.html'
	})
});

localStorage.setItem('username','user');
localStorage.setItem('password','uaspti');

app.controller('loginController',  function($scope, $location, $rootScope, $window){
	
	$scope.submit = function(){
		if($scope.username == localStorage.getItem('username') && $scope.password == localStorage.getItem('password')){
			$rootScope.loggedIn = true;
			$rootScope.loggedIn2 = true;
			$location.path('/home');
			//alert('Log in Success, Welcome'+' '+localStorage.getItem('username'));
			swal("Log in Success", "Welcome"+" "+localStorage.getItem('username'), "success");
		}
		else{
			//alert('name and/or password wrong!!!');
			swal ( "Log in Failed" ,  "Name and/or Password wrong!" ,  "error" )
		}
	};

	
});

app.controller('backGerak', function($scope, $rootScope, $window){
	$rootScope.wx = $window.innerWidth;
	$rootScope.wy = $window.innerHeight;
	
	$scope.mospos = function($event){
		$scope.moveX = (($rootScope.wx / 2) - $event.x) * 0.1;
		$scope.moveY = (($rootScope.wy / 2) - $event.y) * 0.05;
	}
})

app.controller('nowPlaying', function($scope, $http, $location, $rootScope){

	$scope.SITE_PATH="http://image.tmdb.org/t/p/w342/"

	var promise = $http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=feb2a91b74664b02e2e207da734a37da&language=en-US&page=1');
	promise.then(successCallback, failureCallback)

	function successCallback(result) {
		console.log("Data API berhasil masuk", result.data.results)
		$scope.movies = result.data.results;
	}

	function failureCallback(result) {
		console.log("Data API gagal load!", result)
	}

	$scope.getDetails = function(id){
		$rootScope.SITE_DETAILS = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=feb2a91b74664b02e2e207da734a37da&language=en-US'
		$location.path('/details');
	}

	$scope.backToHome = function(){
		$location.path('/home')
	}

	$scope.logOut = function(){
		swal("See yaa...", "Log out success", "success");
		$rootScope.username = '';
		$rootScope.password = '';
		
		$rootScope.loggedIn = false;
		//alert('Logged Out ...');
		$location.path('/');
	}

	$scope.isActive = false;
	$scope.activedrop = function(){
	//alert('clicked');
		$scope.isActive = !$scope.isActive;
	}
})

// Harusnya buat efek loading sebelum masuk home //
// app.controller('loadd', function($scope, $timeout, $rootScope){
// 	if($rootScope.loggedIn2){
// 		$rootScope.loggedIn2 = false;
// 		$scope.load = true;
// 		$timeout(function() {
// 			$scope.load = false;
// 		}, 2000);
// 	}
// })

app.controller('movieDetails', function($scope, $http, $rootScope, $location){
	$scope.SITE_PATH="http://image.tmdb.org/t/p/w500/"
	var promise = $http.get($rootScope.SITE_DETAILS);
	promise.then(successCallback, failureCallback)
	function successCallback(result) {
		console.log("Data API berhasil masuk", result.data)
		//alert(result.data.id);
		$scope.detil = result.data;
	}

	function failureCallback(result) {
		console.log("Data API gagal load!", result)
	}

	$scope.backToHome = function(){
		$location.path('/home')
	}

	$scope.logOut = function(){
		swal("See yaa...", "Log out success", "success");
		$rootScope.username = '';
		$rootScope.password = '';
		
		$rootScope.loggedIn = false;
		//alert('Logged Out ...');
		$location.path('/');
	}

	$scope.isActive = false;
	$scope.activedrop = function(){
		//alert('clicked');
		$scope.isActive = !$scope.isActive;
	}
})

app.controller('aboutMe', function($scope, $rootScope, $location){
	$scope.backToHome = function(){
		$location.path('/home')
	}


	$scope.logOut = function(){
		swal("See yaa...", "Log out success", "success");
		$rootScope.username = '';
		$rootScope.password = '';
		$rootScope.loggedIn = false;
		//alert('Logged Out ...');
		$location.path('/');
	}

	$scope.isActive = false;
	$scope.activedrop = function(){
		//alert('clicked');
		$scope.isActive = !$scope.isActive;
	}
})

app.controller('reference', function($scope){
	$scope.referencenya = false;
	$scope.$watch('referencenya', function(){
		$scope.buttonValue = $scope.referencenya ? 'Hide Reference' : 'Show Reference'
	})	
})
