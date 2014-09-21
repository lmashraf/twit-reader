// services.js

angular.module('twitReader.factories', [])
	   .factory('twitFactory', function($q)
	   {
	   		var _authResult = false;

	   		var factory =
	   		{
		   		initialize : function()
	   			{
	   				debugger;
	   				// initialize OAuth with public key of the app
	   				OAuth.initialize('e6u0TKccWPGCnAqheXQYg76Vf2M', {cache: true});
	   				// try to create an authorisation result when the page loads
	  				_authResult = OAuth.create('twitter');
	   			},

		   		isReady : function()
		   		{
		   			return _authResult;
		   		},

		   		connectTwitter : function()
		   		{
		   			debugger;
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
	   							_authResult = result;
	   							deferred.resolve(result);
	   						}
	   						else
	   						{
	   							console.log("Failed to log into Twitter!");
	   						}
	   					});	

	   				// We grab and return the promise from the deferred object.
	   				return deferred.promise;
	   			},

		   		clearCache : function()
		   		{
		   			OAuth.clearCache('twitter');
		   			_authResult = false;
		  		},

				getLatestTweets : function()
				{
					// Create a unit of work of a deferred object using $q
					var deferred = $q.defer();
		  		
		  			// Make a promise out of the deferred object
		   			var promise = _authResult.get('/1.1/statuses/home_timeline.json')
		   									 .done(function(data)
		  									 	{
		  									 		// Once the data is treated and retrieve thanks to Twitter's REST API
		  									 		// We would like to resolve the deferred object
		   									 		deferred.resolve();
		   									 	});
		   				// Return the promise from the deferred object.
		   				return deferred.promise;
		   		}
		   	}

		   	// return factory
		   	return factory;
	   	});