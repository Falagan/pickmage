import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGalleryComponent {}
