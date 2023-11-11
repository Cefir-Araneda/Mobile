import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  //Creamos Encabezado
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  apiUrl = 'https://api.sendgrid.com/v3/mail/send';
  private apiKey = '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';

  constructor(private http: HttpClient) {}

  sendEmail(to: string[], subject: string, content: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    });

    const payload = {
      personalizations: [
        {
          to: [
            {
              email: to
            }
          ],
          subject: subject
        }
      ],
      from: {
        email: 'noreplydcuctravel@gmail.com'
      },
      content: [
        {
          type: 'text/plain',
          value: content
        }
      ]
    };

    return this.http.post(this.apiUrl, payload, { headers });
  }
}
