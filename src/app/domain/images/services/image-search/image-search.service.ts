import { inject, Injectable } from '@angular/core';
import { UnsplashRepository } from '../../../../infra/repositories/unplash/unsplash.repository';
import { ImageList } from '../../models/image-list.model';
import { ImageSearch } from '../../models/image-search.model';
import { mapDomainImageSearchToRepository } from '../../mappers/image-search.mapper';
import { map, Observable } from 'rxjs';
import { mapRepositoryToDomainImageList } from '../../mappers/image-list.mapper';

@Injectable({
  providedIn: 'root',
})
export class ImageSearchService {
  private readonly repository = inject(UnsplashRepository);

  getImages(params: ImageSearch): Observable<ImageList> {
    const paramsMapped = mapDomainImageSearchToRepository(params);
    return this.repository
      .getImages(paramsMapped)
      .pipe(map((response) => mapRepositoryToDomainImageList(response)));
  }
}
