import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Creamos Encabezado
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  //Creamos Objeto con la URL del APIRest
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  //List All
  getPosts(): Observable<any> {
    return this.http.get(this.apiURL + "/viaje").pipe(
      retry(3)
    );
  }

  // C (Create a post)
  createPost(post: any): Observable<any> {
    return this.http.post(this.apiURL + "/viaje", post, this.httpOptions).pipe(
      retry(3)
    )
  }

  // R (Get one Object)
  getPost(ID: any): Observable<any> {
    return this.http.get(this.apiURL + "/viaje/" + ID).pipe(
      retry(3)
    )
  }

  // U (Update a post)
  updatePost(ID: any, post: any): Observable<any> {
    return this.http.put(this.apiURL + "/viaje/" + ID, post, this.httpOptions).pipe(
      retry(3)
    )
  }

  // D (Delete a post)
  deletePost(ID: any): Observable<any> {
    return this.http.delete(this.apiURL + "/viaje/" + ID).pipe(
      retry(3)
    )
  }

}
