var app = angular.module('starter.controllers', ['ionic', 'ngCordova', 'react'])

	.controller('AppCtrl',function ($scope, $q, $ionicPopup, $cordovaToast, $ionicLoading) {
		window.BOOTSTRAP_OK = true;
		$scope.person = {fname: 'Clark', lname: 'Kent'};
		$scope.onRefresh = function () {
			var fs = new CordovaPromiseFS({
				Promise: $q
			});
			// Initialize a CordovaAppLoader
			var loader = new CordovaAppLoader({
				fs: fs,
				serverRoot: 'http://app.phodal.com/',
				localRoot: 'Cyan',
				cacheBuster: true, // make sure we're not downloading cached files.
				checkTimeout: 10000 // timeout for the "check" function - when you loose internet connection
			});
			loader.check().then(function (updateAvailable) {
				console.log(updateAvailable);
				if (updateAvailable) {
					var confirmPopup = $ionicPopup.confirm({
						title: 'Update Available!',
						template: "<div align='center'>There's a new mini-update available! Get it now?</div>"
					});

					confirmPopup.then(function(res) {
						if (res) {
							$ionicLoading.show ("Downloading the update!");
							loader.download().then(
								function(manifest) {
									loader.update();
									$ionicLoading.hide();
									$cordovaToast.show("App updated!");
								},
								function(failedDownloadUrlArray) {
									$ionicLoading.hide();
									$cordovaToast.show ("Couldn't download the update, try again later!" + failedDownloadUrlArray);
								}
							);

						}
						else {
							// user has said not to update. do nothing.
							$cordovaToast.show ("OK! We'll try again later...");
						}
					});
				}
			});
		};
	});

var Hello = React.createClass({
	propTypes: {
		fname: React.PropTypes.string.isRequired,
		lname: React.PropTypes.string.isRequired
	},

	render: function () {
		return React.DOM.span(null,
			'Hello ' + this.props.fname + ' ' + this.props.lname
		);
	}
});

app.value("Hello", Hello);

app.directive('hello', function (reactDirective) {
	return reactDirective(Hello);
});
