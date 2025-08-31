import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-map-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent implements OnInit, OnChanges, OnDestroy {
  @Input() coords?: { lat: number; lon: number } | null;
  @Input() temp?: number | null;
  @Input() place?: string | null;
  @Input() unit: 'metric' | 'imperial' = 'metric';
  @Output() mapClick = new EventEmitter<{
    lat: number;
    lon: number;
    name?: string;
  }>();

  @ViewChild('mapContainer', { static: true })
  mapEl!: ElementRef<HTMLDivElement>;
  map?: mapboxgl.Map;
  marker?: mapboxgl.Marker;

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.token;
    this.map = new mapboxgl.Map({
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.3522, 48.8566],
      zoom: 9,
    });

    this.map.on('click', (e) => {
      this.mapClick.emit({ lat: e.lngLat.lat, lon: e.lngLat.lng });
    });
  }

  ngOnChanges(): void {
    if (!this.map || !this.coords) return;
    const { lon, lat } = this.coords;
    this.map.flyTo({ center: [lon, lat], zoom: 10 });

    const el = document.createElement('div');
    el.className = 'temp-marker';
    el.innerHTML = `<div class="bubble">${
      this.temp != null ? Math.round(this.temp) : '--'
    } ${this.unit === 'metric' ? '°C' : '°F'}</div>`;

    if (this.marker) this.marker.remove();
    this.marker = new mapboxgl.Marker(el).setLngLat([lon, lat]).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
