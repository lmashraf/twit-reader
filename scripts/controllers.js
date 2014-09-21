// controllers.js

//  define a container for all controllers
var twitControllers = {};

// define twitController
twitControllers.twitController = function($scope, $q, twitFactory)
	{
		// array of tweets
		$scope.tweets = [];

		// initialise twitreader factories
		twitFactory.initialize();

		// uses OAuth to get the latest tweets from the user
		$scope.refreshTweets = function()
		{
			twitFactory.getLatestTweets().then(function(data)
				{
					$scope.tweets = data;
				});
		}

		// once the user clicks connect, a popup would show up
		// to ask authorisation to access personal data
		// this must use the methods defined in the twitFactory
		$scope.logIn = function()
		{
			twitFactory.connectTwitter().then(function(){

				// if the authentification is successful,
				// we would like to hide the log in button...
				if(twitFactory.isReady())
				{
					$('#logintButton').fadeOut(function() 
					{
						// ... and show the other two.
						$('#refreshButton, #logoutButton').fadeIn();
					});
				}
			});
		}

		// clears the OAuth's cache, the user will have to
		// reauthenticate if he wants to access his timeline
		// again.
		$scope.logOut = function()
		{
			twitFactory.clearCache();
			$scope.tweets = [];

			// to logout, we hide refresh/logout buttons...
			$('#refreshButton', '#logoutButton').fadeOut(function()
				{
					$('#loginButton').fadeIn();
				});
		}

		// using jQuery we will make sure to hide the 'connect' button
		// once the user is already connected, and vice-versa.
		if(twitFactory.isReady())
		{
			$('#loginButton').hide();
			$('#refreshButton', '#logoutButton').show();
			$scope.refreshTweets();
		}
	};

twitReader.controller(twitControllers);