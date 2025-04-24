import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { JcylTurismoService } from './jcyl-turismo.service';
import { Camping } from '../models/camping';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(
    private http: HttpClient,
    private jcylService: JcylTurismoService
  ) {}

  makeCapitalMarkers(map: L.Map): void {
    this.jcylService
      .getCampings(
        'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/registro-de-turismo-de-castilla-y-leon/records',
        { refine: 'establecimiento:"Campings"' }
      )
      .subscribe({
        next: (campings: Camping[]) => {
          console.log(campings);
          for (var i = 0; i < campings.length; i++) {
            const lon = campings[i].posicion.lon;
            const lat = campings[i].posicion.lat;
            const marker = L.marker([lat, lon]);

            //console.log(c)

            const popupContent = `
        <div style="
          background-color: white;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          font-family: Arial, sans-serif;
          font-size: 14px;
          color: #333;
        ">
          <h3 style="margin-top: 0;">${campings[i].nombre}</h3>
          <a href="http://localhost:4200/place">Ir a la página de lugar</a>
        </div>
      `;

            marker.bindPopup(popupContent);

            marker.addTo(map);

            marker.addTo(map);
          }
        },
      });
    /*
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        console.log(c)

        const popupContent = `
        <div style="
          background-color: white;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          font-family: Arial, sans-serif;
          font-size: 14px;
          color: #333;
        ">
          <h3 style="margin-top: 0;">${c.properties.name}</h3>
          <a href="http://localhost:4200/place">Ir a la página de lugar</a>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.addTo(map);
        
        marker.addTo(map);
      }
    });
    */
  }
}
