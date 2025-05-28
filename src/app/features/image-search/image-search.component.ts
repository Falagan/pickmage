import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ImageCardComponent } from '../../domain/images/components/image-card/image-card.component';
import { ImageSearchService } from './services/image-search/image-search.service';
import { ImageList } from '../../domain/images/models/image-list.model';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { InputSearchComponent } from '../../shared/input-search/input-search.component';

@Component({
  selector: 'app-image-search',
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    ImageCardComponent,
    ImageGalleryComponent,
    InputSearchComponent,
  ],
  templateUrl: './image-search.component.html',
  styleUrl: './image-search.component.scss',
  providers: [ImageSearchService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSearchComponent {
  private readonly imageSerarchService = inject(ImageSearchService);
  public $images = this.imageSerarchService.$images;
  
  onSearch(text: any) {
    this.imageSerarchService.getImages({ page: 1, itemsPerPage: 10, text })
  }
}
