import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  //URL del APIRest
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  //Lista
  getPosts(): Observable<any> {
    return this.http.get(this.apiURL + "/posts").pipe(
      retry(3)
    );
  }

  //C
  createPost(post: any): Observable<any> {
    return this.http.post(this.apiURL + "/posts", post, this.httpOptions).pipe(
      retry(3)
    )
  }

  //R
  getPost(ID: any): Observable<any> {
    return this.http.get(this.apiURL + "/posts/" + ID).pipe(
      retry(3)
    )
  }

  //U
  updatePost(ID: any, post: any): Observable<any> {
    return this.http.put(this.apiURL + "/posts/" + ID, post, this.httpOptions).pipe(
      retry(3)
    )
  }

  //D
  deletePost(ID: any): Observable<any> {
    return this.http.delete(this.apiURL + "/posts/" + ID).pipe(
      retry(3)
    )
  }
}
