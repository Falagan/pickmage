import { UnsplashSearchParams } from '../../../infra/repositories/unplash/models/unsplash-searh-params';
import { ImageSearch } from '../models/image-search.model';

export function mapDomainImageSearchToRepository(
  params: ImageSearch
): UnsplashSearchParams {
  return {
    text: params.text,
    order_by: params.orderBy,
    per_page: params.itemsPerPage,
    page: params.page,
  };
}
