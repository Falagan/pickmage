import { inject, Injectable } from '@angular/core';
import { UnsplashRepository } from '../../../../infra/repositories/unplash/unsplash.repository';
import { ImageList } from '../../../../domain/images/models/image-list.model';
import { ImageSearch } from '../../../../domain/images/models/image-search.model';
import { mapDomainImageSearchToRepository } from '../../mappers/image-search.mapper';
import { BehaviorSubject, catchError, map, of, lastValueFrom } from 'rxjs';
import { mapRepositoryToDomainImageList } from '../../mappers/image-list.mapper';

@Injectable({
  providedIn: 'root',
})
export class ImageSearchService {
  private readonly repository = inject(UnsplashRepository);

  public $images = new BehaviorSubject<ImageList>({ total: 0, items: [] });

  async getImages(params: ImageSearch): Promise<void> {
    const paramsMapped = mapDomainImageSearchToRepository(params);

    const response = await lastValueFrom(
      this.repository.getImages(paramsMapped).pipe(
        map((response) => mapRepositoryToDomainImageList(response)),
        catchError(() => of({ total: 0, items: [] }))
      )
    );
    this.$images.next(response);
  }
}
