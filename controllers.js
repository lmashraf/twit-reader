// controllers.js

myApp.controller('twitController', function($scope)
	{
		// array of tweets
		$scope.tweets = [];

		// initialise twitreader factories
		twitFactory.initialize();

		// uses OAuth to get the latest tweets from the user
		$scope.refreshTweets = function()
		{}

		// once the user clicks connect, a popup would show up
		// to ask authorisation to access personal data
		// this must use the methods defined in the twitFactory
		$scope.logIn = function()
		{}

		// clears the OAuth's cache, the user will have to
		// reauthenticate if he wants to access his timeline
		// again.
		$scope.logOut = function()
		{}

		// using jQuery we will make sure to hide the 'connect' button
		// once the user is already connected, and vice-versa.
		if(twitFactory.isReady())
		{}
	});