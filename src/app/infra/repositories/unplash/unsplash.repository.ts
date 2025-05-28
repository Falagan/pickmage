import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnsplashSearchParams } from './models/unsplash-searh-params';
import { UnsplashImage } from './models/unsplash-image';
import { UnsplashApiResponsePaginated } from './models/unsplash-api-response';
import { UNSPLASH_API } from './config/unsplash-api.config';

@Injectable({
  providedIn: 'root',
})
export class UnsplashRepository {
  private readonly httpClient = inject(HttpClient);

  getImages(
    params: UnsplashSearchParams
  ): Observable<UnsplashApiResponsePaginated<UnsplashImage>> {
    const { text, order_by, per_page, page } = params;
    return this.httpClient.get<UnsplashApiResponsePaginated<UnsplashImage>>(
      `${UNSPLASH_API.BASE_URL}/${UNSPLASH_API.ROUTES.SEARCH_PHOTOS}?client_id=${UNSPLASH_API.API_KEY}&query=${text}&order_by=${order_by}&per_page=${per_page}&page=${page}`
    );
  }
}
