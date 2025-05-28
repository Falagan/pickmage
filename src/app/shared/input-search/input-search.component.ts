import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject, debounce, debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-search',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  @Input() placeholder!: string;
  @Input() debounceTime = 0;
  @Output() change = new EventEmitter<string>();
  private changeSubject = new Subject<string>();
  public value: string = '';

  ngOnInit(): void {
    this.subscribeToInputChanges();
  }

  public onClearValue() {
    this.value = '';
  }

  public onChange(text: string) {
    this.changeSubject.next(text);
  }

  private subscribeToInputChanges() {
    this.changeSubject
      .pipe(
        debounceTime(this.debounceTime),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((text) => this.change.emit(text));
  }
}
