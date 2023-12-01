import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  public map!: mapboxgl.Map;
  public style!: 'mapbox://styles/mapbox/streets-v11';

  constructor() {
    mapboxgl.accessToken = environment.MAPBOX_KEY
   }

  ngOnInit() {
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 14,
      center: [
        -70.6334111,
        -33.3609694
      ]
    });
  }

}
