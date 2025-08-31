import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChatbotPanelComponent } from './dashboard/components/chatbot-panel/chatbot-panel.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ChatbotPanelComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Weather-Buddy';
  isChatbotOpen = false;

  constructor(public weather: WeatherService) {}

  toggleChatbot() {
    this.isChatbotOpen = !this.isChatbotOpen;
  }

  onChatbotFill(event: { city?: string; unit?: 'metric' | 'imperial' }) {
    if (event.unit) {
      this.weather.setUnit(event.unit);
    }
    if (event.city) {
      this.weather.searchCity(event.city);
    }
  }
}
