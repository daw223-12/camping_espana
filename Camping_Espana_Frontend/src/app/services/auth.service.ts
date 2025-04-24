import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { ApiRoutes as api } from './../globals';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  // baseUrl: string = 'http://camping-espana.serveminecraft.net/camping-espana-backend/index.php';
  // private csrfUrl = 'http://camping-espana.serveminecraft.net/camping-espana-backend/index.php/sanctum/csrf-cookie';
  // private apiUrl = 'http://camping-espana.serveminecraft.net/camping-espana-backend/index.php/login';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getCsrfToken(): Observable<any> {
    console.log(api.DEVELOP_CSRF_URL)
    return this.http.get(api.DEVELOP_CSRF_URL, { withCredentials: true });
  }

  login(data: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.post(api.DEVELOP_AUTH_URL+"/login", data, { headers: headers, withCredentials: true });
      })
    );
  }
  getUser(): Observable<any> {
    
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.get(api.DEVELOP_AUTH_URL+"/api/user", { headers: headers, withCredentials: true });
      })
    );
  }

  register(data: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.post(api.DEVELOP_AUTH_URL+'/register', data, { headers: headers, withCredentials: true });
      })
    );
  }

  logout(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN'),
        });
        return this.http.post(
          api.DEVELOP_AUTH_URL + '/logout',
          {},
          { headers: headers, withCredentials: true }
        );
      })
    );
  }
}
