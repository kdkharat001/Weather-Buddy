import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chatbot-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './chatbot-panel.component.html',
  styleUrls: ['./chatbot-panel.component.scss'],
})
export class ChatbotPanelComponent {
  @Input() unit: 'metric' | 'imperial' = 'metric';
  @Input() city = '';
  @Output() fill = new EventEmitter<{
    city?: string;
    unit?: 'metric' | 'imperial';
  }>();

  step = signal<1 | 2 | 3>(1);
  tempCity = signal<string>('');

  chooseUnit(u: 'metric' | 'imperial') {
    this.fill.emit({ unit: u });
    this.step.set(2);
  }
  setCity() {
    this.fill.emit({ city: this.tempCity() || 'Paris' });
    this.step.set(3);
  }
  restart() {
    this.step.set(1);
    this.tempCity.set('');
  }
}
