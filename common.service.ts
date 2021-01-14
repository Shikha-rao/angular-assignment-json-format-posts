import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getPostsData(): Observable<any>{
    let users=this.http.get<any>('https://gorest.co.in/public-api/users')

    let comments=this.http.get<any>('https://gorest.co.in/public-api/comments')

    let posts=this.http.get<any>('https://gorest.co.in/public-api/posts')

    return forkJoin([users, comments,posts]);
  }
}
