import { TestBed } from '@angular/core/testing';
import { ImageSearchService } from './image-search.service';
import { UnsplashRepository } from '../../../../infra/repositories/unplash/unsplash.repository';


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
});
