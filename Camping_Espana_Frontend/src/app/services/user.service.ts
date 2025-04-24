import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiRoutes as api } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = api.DEVELOP_API_URL+'/users';
  private csrfUrl = api.DEVELOP_CSRF_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getCsrfToken(): Observable<any> {
    return this.http.get(this.csrfUrl, { withCredentials: true });
  }
  

  getUserByEmail(email: string): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.get(this.baseUrl+"/"+email, { headers: headers, withCredentials: true });
      })
    );
  }
}
