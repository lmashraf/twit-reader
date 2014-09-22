// services.js

angular.module('twitReader.factories', [])
	   .factory('twitFactory', function($q)
	   {
	   		var PUBLIC_KEY_OAUTH = 'SbQIspWCFyZymN7beGCmPVsnr';

	   		var authentificationResult = false;   		
	   		var factory =
	   		{
		   		initialize : function()
	   			{
	   				// initialize OAuth with public key of the app
	   				// public key was generated through twitter: https://apps.twitter.com/
	   				OAuth.initialize(PUBLIC_KEY_OAUTH, {cache: true});
	   				// try to create an authorisation result when the page loads
	  				authentificationResult = OAuth.create('twitter');
	   			},

		   		isReady : function()
		   		{
		   			return authentificationResult;
		   		},

		   		connectTwitter : function()
		   		{
		   			// First we create a work of unit using a deferred object.
		   			// A deferred represents 'units of work'. It a communication object
		   			// that signals the start, progress and completion of work
		   			// (INPUT)
		   			var deferred = $q.defer();

	   				// The promise is an OUTPUT object  that represents
	   				// data, it has certain states (pending, fulfilled or rejected)
	   				// or a callback method that should be called once the 
	   				// promise resolves, rejects or gives a progress update.
	   				OAuth.popup('twitter', {cache: true}, function(error, result)
	   					{
	   						//cache means to execute the callback if the tokens are already present
	   						if(!error)
	   						{
	   							authentificationResult = result;
	   							deferred.resolve(result);

	   							$('#statusMessage').addClass('text-success');
	   							$('#statusMessage').text("Success!")
	   						}
	   						else
	   						{
	   							$('#statusMessage').addClass('text-danger');
	   							$('#statusMessage').text("Authetification failed!")
	   						}
	   					});	

	   				// We grab and return the promise from the deferred object.
	   				return deferred.promise;
	   			},

		   		clearCache : function()
		   		{
		   			OAuth.clearCache('twitter');
		   			authentificationResult = false;
		  		},

				getLatestTweets : function()
				{
					// Create a unit of work of a deferred object using $q
					var deferred = $q.defer();
		  		
		  			// Make a promise out of the deferred object
		   			var promise = authentificationResult.get('/1.1/statuses/home_timeline.json')
		   									 .done(function(data)
		  									 	{
		  									 		// Once the data is treated and retrieve thanks to Twitter's REST API
		  									 		// We would like to resolve the deferred object
		   									 		deferred.resolve(data);
		   									 	});
		   				// Return the promise from the deferred object.
		   				return deferred.promise;
		   		}
		   	}

		   	// return factory
		   	return factory;
	   	});