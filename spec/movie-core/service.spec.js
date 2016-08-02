describe('MovieCore', function(){

	var PopularMovies, $httpBackend;

	beforeEach(module('movieCore'));

	beforeEach(inject( (_PopularMovies_, _$httpBackend_) => {
		PopularMovies = _PopularMovies_;
		$httpBackend = _$httpBackend_;
		})
	);

	afterEach(() => {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should create popular movie', () => {

		var expectedData = data => angular.fromJson(data).movieId = 'tt0076759';

		$httpBackend.expectPOST(/./, expectedData).respond(201);
		
		var popularMovie = new PopularMovies({
			movieId: 'tt0076759',
			description: 'Great movie'
		});

		popularMovie.$save();

		expect($httpBackend.flush).not.toThrow();
	});

	it('should get popular movie by id', () => {
		$httpBackend.expectGET('popular/tt0076759').respond(200);
		PopularMovies.get({ movieId: 'tt0076759' });
		expect($httpBackend.flush).not.toThrow();
	});

	it('should update popular movie', () => {
		$httpBackend.expectPUT('popular').respond(200);
		var popularMovie = new PopularMovies({
			movieId: 'tt0076759',
			description: 'Great movie'
		});

		popularMovie.$update();
		expect($httpBackend.flush).not.toThrow();
	});

	it('should authentificate requests', () => {
		var headerData = headers => headers.authToken = 'teddybear';
		var matchAny = /.*/;

		$httpBackend.whenGET(matchAny, headerData).respond(200);
		$httpBackend.expectPOST(matchAny, matchAny, headerData).respond(200);
		$httpBackend.expectPUT(matchAny, matchAny, headerData).respond(200);
		$httpBackend.expectDELETE(matchAny, headerData).respond(200);

		var popularMovie = { movieId: 'tt0076759', description: 'Great movie' };

		PopularMovies.query();
		PopularMovies.get({ id: 'tt0076759' });
		new PopularMovies(popularMovie).$save();
		new PopularMovies(popularMovie).$update();
		new PopularMovies(popularMovie).$remove();

		$httpBackend.flush(1);
		$httpBackend.flush(1);
		$httpBackend.flush(1);
		$httpBackend.flush(1);
		$httpBackend.flush(1);
	});
});
 