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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization'
    })
  }

  //Creamos Objeto con la URL del APIRest
  apiURL = 'https://ribtpjqph3.execute-api.us-east-1.amazonaws.com';


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
      retry(1)
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

  //List All
  listCredentials(): Observable<any> {
    return this.http.get(this.apiURL + "/listCredentials").pipe(
      retry(3)
    );
  }

  // C (Create a post)
  createCredential(credentials: any): Observable<any> {
    return this.http.post(this.apiURL + "/createCredential", credentials, this.httpOptions).pipe(
      retry(3)
    )
  }

  // R (Get one Object)
  readCredential(username: any): Observable<any> {
    return this.http.get(this.apiURL + "/readCredential" + username).pipe(
      retry(3)
    )
  }

  // U (Update a post)
  updateCredential(username: any, post: any): Observable<any> {
    return this.http.put(this.apiURL + "/updateCredential" + username, post, this.httpOptions).pipe(
      retry(3)
    )
  }

  // D (Delete a post)
  deleteCredential(username: any): Observable<any> {
    return this.http.delete(this.apiURL + "/deleteCredential" + username).pipe(
      retry(3)
    )
  }

  //Pal login (hacer funcion)
  verificarCredenciales(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post(this.apiURL + '/credentials/', credentials, this.httpOptions).pipe(
      retry(3)
    );
  }

}