import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { ShapeService } from '../../services/shape.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private states!: any;
  private bounds = L.latLngBounds(
    [40.5, -5.914334], // Suroeste
    [42.79669, -3.37424]  // Noreste
  );

  constructor(
    private markerService: MarkerService,
    private shapeService: ShapeService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer(); 
    });
    //this.map.setMaxBounds(this.bounds);
    this.map.on('drag', () => {
      if (this.map) {
        this.map.panInsideBounds(this.bounds, { animate: true });
      }
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [41.633076, -4.758309],
      zoom: 10,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 15,
        minZoom: 9,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#121212',
        fillOpacity: 0.8,
        fillColor: '#656565'
      }),
      // onEachFeature: (feature, layer) => (
      //   layer.on({
      //     mouseover: (e) => (this.highlightFeature(e)),
      //     mouseout: (e) => (this.resetFeature(e)),
      //   })
      // )
    });

    this.map.addLayer(stateLayer);
  }

  private highlightFeature(e:any) {
    const layer = e.target;
  
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }
  
  private resetFeature(e: any) {
    const layer = e.target;
  
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }
}
