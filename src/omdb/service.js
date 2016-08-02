angular.module('omdb', [])
	.factory('omdbApi', function($http, $q){
		var service = {};
		var baseUrl = 'http://www.omdbapi.com/?v=1&';

		const htppPromise = url => {
			var deferred = $q.defer();
			$http.get(url)
				.success(data => deferred.resolve(data))
				.error( () => deferred.reject());
			return deferred.promise;
		};


		service.search = query => htppPromise(baseUrl + 's=' + encodeURIComponent(query));

		service.find = id =>  htppPromise(baseUrl + 'i=' + id);

		return service;
	});
