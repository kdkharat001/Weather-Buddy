import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { signal } from '@angular/core';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnChanges {
  @Input() unit: 'metric' | 'imperial' = 'metric';
  @Input() city = '';
  @Input() selectedCity: string = '';
  @Output() submitSearch = new EventEmitter<{
    city: string;
    unit: 'metric' | 'imperial';
  }>();

  modelCity = signal<string>('');
  isFahrenheit = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['city']) {
      this.modelCity.set(this.city ?? '');
    }
    if (changes['unit']) {
      this.isFahrenheit.set(this.unit === 'imperial');
    }
    if (changes['selectedCity']) this.modelCity.set(this.selectedCity);
  }

  toggleUnit(value: boolean) {
    this.isFahrenheit.set(value);
  }

  onSubmit() {
    const unit = this.isFahrenheit() ? 'imperial' : 'metric';
    this.submitSearch.emit({ city: this.modelCity().trim() || 'Paris', unit });
  }
}
