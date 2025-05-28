import { UnsplashApiResponsePaginated } from '../../../infra/repositories/unplash/models/unsplash-api-response';
import { UnsplashImage } from '../../../infra/repositories/unplash/models/unsplash-image';
import { ImageList } from '../../../domain/images/models/image-list.model';
import { mapRepositoryToDomainImage } from './image.mapper';

export function mapRepositoryToDomainImageList(
  dto: UnsplashApiResponsePaginated<UnsplashImage>
): ImageList {
  return {
    items: dto.results.map(mapRepositoryToDomainImage),
    total: dto.total,
  };
}
