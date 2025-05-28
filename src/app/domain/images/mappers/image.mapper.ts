import { UnsplashImage } from '../../../infra/repositories/unplash/models/unsplash-image';
import { Image } from '../models/image.model';

export function mapRepositoryToDomainImage(dto: UnsplashImage): Image {
  return {
    id: dto.id,
    color: dto.color,
    urls: {
      raw: dto.urls.raw,
      full: dto.urls.full,
      regular: dto.urls.regular,
      small: dto.urls.small,
      thumb: dto.urls.thumb,
    },
    description: dto.description,
    width: dto.width,
    height: dto.height,
    createdAt: dto.created_at,
  };
}
