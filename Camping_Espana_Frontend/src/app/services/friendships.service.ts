import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Review } from '../models/review';

import { ApiRoutes as api } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class FriendshipsService {
  
  private baseUrl: string = api.DEVELOP_API_URL+'/friends';
  private pendingFriendsUrl: string = api.DEVELOP_API_URL+'pendingFriends';
  private csrfUrl = api.DEVELOP_CSRF_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getCsrfToken(): Observable<any> {
    return this.http.get(this.csrfUrl, { withCredentials: true });
  }
  // post
  sendFriendshipRequest(data: {friend_id: number}): Observable<any> {
    console.log(data);
    
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.post(this.baseUrl, data, { headers: headers, withCredentials: true });
      })
    );
  }

  getFriends(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.get(this.baseUrl, { headers: headers, withCredentials: true });
      })
    );
  }

  getPendingFriends(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.get(this.pendingFriendsUrl, { headers: headers, withCredentials: true });
      })
    );
  }

  //put
  acceptFriendRequest(data: any): Observable<any> {    
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.put(this.baseUrl, data, { headers: headers, withCredentials: true });
      })
    );
  }

  deleteFriend(id: number): Observable<any> {
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
