angular.module('starter', ['ionic', 'starter.controllers', 'react', 'ngCordova'])

	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		})
	})
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('tab', {
				url: "/tab",
				abstract: true,
				templateUrl: "templates/tabs.html"
			})
			.state('tab.app', {
				url: '/app',
				views: {
					'tab-app': {
						templateUrl: 'templates/app.html',
						controller: 'AppCtrl'
					}
				}
			});
		$urlRouterProvider.otherwise('/tab/app');
	});
