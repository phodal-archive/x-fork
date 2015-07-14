var app = angular.module('starter.controllers', ['ionic', 'ngCordova', 'react'])

	.controller('AppCtrl',function ($scope, $q) {
		$scope.person = {fname: 'Clark', lname: 'Kent'};
		$scope.onRefresh = function () {
			console.log("update ready");
			var fs = new CordovaPromiseFS({
				Promise: $q
			});
			// Initialize a CordovaAppLoader
			var loader = new CordovaAppLoader({
				fs: fs,
				serverRoot: 'http://app.phodal.com/',
				localRoot: 'app',
				cacheBuster: true, // make sure we're not downloading cached files.
				checkTimeout: 10000 // timeout for the "check" function - when you loose internet connection
			});
			loader.check().then(function (updateAvailable) {
				console.log(updateAvailable);
				if (updateAvailable) {
					loader.download(onprogress)
						.then(
						function (manifest) {
							console.log(manifest);
							loader.update();
						},
						function (failedDownloadUrlArray) {
							console.log(failedDownloadUrlArray);
						}
					)
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
