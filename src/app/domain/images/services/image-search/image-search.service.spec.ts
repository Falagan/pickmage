import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ImageSearchService } from './image-search.service';
import { UnsplashRepository } from '../../../../infra/repositories/unplash/unsplash.repository';
import { ImageSearch } from '../../models/image-search.model';
import { ImageList } from '../../models/image-list.model';
import { UnsplashSearchParams } from '../../../../infra/repositories/unplash/models/unsplash-searh-params';
import { UnsplashApiResponsePaginated } from '../../../../infra/repositories/unplash/models/unsplash-api-response';
import { UnsplashImage } from '../../../../infra/repositories/unplash/models/unsplash-image';
import { UnsplashApiResponseBuilder } from '../../../../infra/repositories/unplash/testing/unsplash-api-response-mock.builder';

describe('ImageSearchService', () => {
  let service: ImageSearchService;
  let repositoryMock: jasmine.SpyObj<UnsplashRepository>;

  beforeEach(() => {
    repositoryMock = jasmine.createSpyObj('UnsplashRepository', ['getImages']);

    TestBed.configureTestingModule({
      providers: [
        ImageSearchService,
        { provide: UnsplashRepository, useValue: repositoryMock },
      ],
    });

    service = TestBed.inject(ImageSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct ImageList model', (done) => {
    // Arrange
    const searchMockInput: ImageSearch = {
      text: 'cats',
      orderBy: 'latest',
      itemsPerPage: 5,
      page: 1,
    };
    const mockApiResponse = new UnsplashApiResponseBuilder()
      .withTotal(100)
      .withResults([])
      .build();
    // Act
    repositoryMock.getImages.and.returnValue(of(mockApiResponse));
    // Assert
    service.getImages(searchMockInput).subscribe((imageList: ImageList) => {
      expect(repositoryMock.getImages).toHaveBeenCalledWith({
        text: 'cats',
        order_by: 'latest',
        per_page: 5,
        page: 1,
      } as UnsplashSearchParams);

      expect(imageList.total).toBe(100);
      expect(imageList.items.length).toBe(0);
      done();
    });
  });
});
