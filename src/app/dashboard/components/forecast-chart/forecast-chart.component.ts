import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import type { ForecastSummaryDay } from '../../../shared/models';

Chart.register(...registerables);

@Component({
  selector: 'app-forecast-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-chart.component.html',
  styleUrls: ['./forecast-chart.component.scss'],
})
export class ForecastChartComponent implements OnChanges, AfterViewInit {
  @Input() days?: ForecastSummaryDay[] | null;
  @Input() unit: 'metric' | 'imperial' = 'metric';

  @ViewChild('forecastChart') forecastChart?: ElementRef<HTMLCanvasElement>;
  private chart: Chart | null = null;

  ngAfterViewInit() {
    this.tryRenderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.tryRenderChart();
  }

  private tryRenderChart() {
    if (this.forecastChart?.nativeElement && this.days?.length) {
      this.renderChart();
    }
  }

  private renderChart() {
    if (
      !this.forecastChart?.nativeElement ||
      !this.days ||
      this.days.length === 0
    )
      return;

    const ctx = this.forecastChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const unitSym = this.unit === 'metric' ? '°C' : '°F';
    const labels = this.days.map((d) => d.date);
    const dataMin = this.days.map((d) => Number(d.min.toFixed(1)));
    const dataMax = this.days.map((d) => Number(d.max.toFixed(1)));

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Min',
            data: dataMin,
            borderColor: '#3498db',
            backgroundColor: 'rgba(243, 244, 245, 0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#3498db',
          },
          {
            label: 'Max',
            data: dataMax,
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#e74c3c',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#fff', font: { size: 14 } } },
          title: {
            display: true,
            text: '3-Day Forecast',
            color: '#fff',
            font: { size: 18, weight: 'bold' },
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 6,
          },
        },
        scales: {
          x: {
            ticks: { color: '#fff', font: { size: 13 } },
            grid: { color: 'rgba(0,0,0,0.05)' },
            title: {
              display: true,
              text: 'Date',
              color: '#fff',
              font: { size: 14, weight: 'bold' },
            },
          },
          y: {
            ticks: { color: '#fff', font: { size: 13 } },
            grid: { color: 'rgba(0,0,0,0.05)' },
            title: {
              display: true,
              text: `Temperature (${unitSym})`,
              color: '#fff',
              font: { size: 14, weight: 'bold' },
            },
          },
        },
      },
    });
  }
}
