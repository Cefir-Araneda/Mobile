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
  apiURL = 'https://ribtpjqph3.execute-api.us-east-1.amazonaws.com';


  constructor(private http: HttpClient) { }
  //List All
  listTravels(): Observable<any> {
    return this.http.get(this.apiURL + "/listTravels").pipe(
      retry(3)
    );
  }

  // C (Create a post)
  createTravel(post: any): Observable<any> {
    return this.http.post(this.apiURL + "/createTravel", post, this.httpOptions).pipe(
      retry(1)
    )
  }

  // R (Get one Object)
  getTravel(ID: any): Observable<any> {
    return this.http.get(this.apiURL + "/readTravel/" + ID).pipe(
      retry(3)
    )
  }

  updateTravel(id: any, post: any): Observable<any> {
    console.log(id)
    return this.http.put(this.apiURL + "/updateTravel/" + id, post, this.httpOptions).pipe(
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
    console.log(credentials)
    return this.http.post(this.apiURL + "/createCredential", credentials, this.httpOptions).pipe(
      retry(3)
    )
  }

  // R (Get one Object)
  readCredential(username: any): Observable<any> {
    return this.http.get(this.apiURL + "/readCredential/" + username).pipe(
      retry(3)
    )
  }

  // U (Update a post)
  updateCredential(username: any, post: any): Observable<any> {
    return this.http.put(this.apiURL + "/updateCredential/" + username, post, this.httpOptions).pipe(
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