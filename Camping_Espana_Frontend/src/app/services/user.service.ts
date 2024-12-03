import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://camping-espana.serveminecraft.net/camping-espana-backend:8000/api/users';
  private csrfUrl = 'http://camping-espana.serveminecraft.net/camping-espana-backend:8000/sanctum/csrf-cookie';

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
