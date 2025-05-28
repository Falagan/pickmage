import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UnsplashRepository } from './unsplash.repository';
import { UnsplashSearchParams } from './models/unsplash-searh-params';
import { UnsplashApiResponsePaginated } from './models/unsplash-api-response';
import { UnsplashImage } from './models/unsplash-image';
import { UnsplashApiResponseBuilder } from './testing/unsplash-api-response-mock.builder';
import { UNSPLASH_API } from './config/unsplash-api.config';

describe('UnsplashRepository', () => {
  let repository: UnsplashRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UnsplashRepository],
    });

    repository = TestBed.inject(UnsplashRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should call GET with correct URL and query params', () => {
    // Arrange
    const mockApiSearchParams: UnsplashSearchParams = {
      text: 'nature',
      order_by: 'relevant',
      per_page: 10,
      page: 1,
    };
    const mockApiSearchResponse: UnsplashApiResponsePaginated<UnsplashImage> =
      new UnsplashApiResponseBuilder().build();
    // Act
    repository.getImages(mockApiSearchParams).subscribe((response) => {
      expect(response).toEqual(mockApiSearchResponse);
    });

    const req = httpMock.expectOne((request) =>
      request.url.startsWith(
        `${UNSPLASH_API.BASE_URL}/${UNSPLASH_API.ROUTES.SEARCH_PHOTOS}`
      )
    );
    // Assert
    expect(req.request.method).toBe('GET');
    expect(req.request.urlWithParams).toContain(
      `client_id=${UNSPLASH_API.API_KEY}`
    );
    expect(req.request.urlWithParams).toContain(`query=nature`);
    expect(req.request.urlWithParams).toContain(`order_by=relevant`);
    expect(req.request.urlWithParams).toContain(`per_page=10`);
    expect(req.request.urlWithParams).toContain(`page=1`);
    req.flush(mockApiSearchResponse);
  });

  it('should call GET with correct URL and return correct response', () => {
    // Arrange
    const mockApiSearchParams: UnsplashSearchParams = {
      text: 'nature',
      order_by: 'relevant',
      per_page: 10,
      page: 1,
    };
    const mockApiSearchResponse: UnsplashApiResponsePaginated<UnsplashImage> =
      new UnsplashApiResponseBuilder().build();
    // Act
    repository.getImages(mockApiSearchParams).subscribe((response) => {
      expect(response).toEqual(mockApiSearchResponse);
    });

    const req = httpMock.expectOne((request) =>
      request.url.startsWith(
        `${UNSPLASH_API.BASE_URL}/${UNSPLASH_API.ROUTES.SEARCH_PHOTOS}`
      )
    );
    // Assert
    req.flush(mockApiSearchResponse);
  });

  it('should handle empty results', () => {
    // Arrange
    const mockApiSearchParams: UnsplashSearchParams = {
      text: 'nonexistent',
      order_by: 'latest',
      per_page: 5,
      page: 1,
    };
    const mockApiSearchResponse: UnsplashApiResponsePaginated<UnsplashImage> =
      new UnsplashApiResponseBuilder()
        .withTotal(0)
        .withTotalPages(100)
        .withResults([])
        .build();
    // Act
    repository.getImages(mockApiSearchParams).subscribe((response) => {
      expect(response.results.length).toBe(0);
      expect(response.total).toBe(0);
    });
    // Assert
    const req = httpMock.expectOne((request) =>
      request.url.includes(UNSPLASH_API.ROUTES.SEARCH_PHOTOS)
    );
    req.flush(mockApiSearchResponse);
  });
});
