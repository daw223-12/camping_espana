import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Review } from '../models/review';

import { ApiRoutes as api } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl: string = api.DEVELOP_API_URL+'/reviews';
  private csrfUrl = api.DEVELOP_CSRF_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getCsrfToken(): Observable<any> {
    return this.http.get(this.csrfUrl, { withCredentials: true });
  }

  postReview(data: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.post(this.baseUrl, data, { headers: headers, withCredentials: true });
      })
    );
  }

  getReviewsByUser(user_id: number): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.get(this.baseUrl+"/"+user_id, { headers: headers, withCredentials: true });
      })
    );
  }


  updateReview(data: any): Observable<any> {    
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.put(this.baseUrl, data, { headers: headers, withCredentials: true });
      })
    );
  }

  deleteReview(id: number): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.delete(this.baseUrl+"/"+id, { headers: headers, withCredentials: true });
      })
    );
  }
}


