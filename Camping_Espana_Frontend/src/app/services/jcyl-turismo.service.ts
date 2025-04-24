import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiRoutes as api } from './../globals';
import { Camping } from '../models/camping';

@Injectable({
  providedIn: 'root',
})
export class JcylTurismoService {

  // ?limit=100refine=establecimiento%3A%22Campings%22
  private apiUrl: string = api.JCYL_TURISMO;


  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Todo: Dar sólo una respuesta
  getCampings<T>(
    url: string,
    baseParams: { [key: string]: string } = {},
    pageSize: number = 100
  ): Observable<Camping[]> {
    const countParams = new HttpParams({ fromObject: { ...baseParams, limit: '1' } });
  
    // 1. Solo usamos esta para obtener el total
    return this.http.get<any>(url, { params: countParams }).pipe(
      switchMap(response => {
        const total = response.total_count || 0;
        const totalPages = Math.ceil(total / pageSize);
        const requests: Observable<any>[] = [];
  
        // 2. Hacemos peticiones reales a partir de offset 0
        for (let i = 0; i < totalPages; i++) {
          const offset = i * pageSize;
          const pageParams = new HttpParams({
            fromObject: {
              ...baseParams,
              limit: pageSize.toString(),
              offset: offset.toString()
            }
          });
  
          requests.push(this.http.get<any>(url, { params: pageParams }));
        }
  
        // 3. Combinamos todas las respuestas en un solo array
        return forkJoin(requests).pipe(
          map(responses => {
            return responses.flatMap(r => r.results || []); // asegurar que siempre es array
          })
        );
      })
    );
  }

  getData(): Observable<any> {
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => {
        var totalCount = data.total_count;
        console.log(totalCount)
      },
    })

    return this.http.get(this.apiUrl);   
  }
}
