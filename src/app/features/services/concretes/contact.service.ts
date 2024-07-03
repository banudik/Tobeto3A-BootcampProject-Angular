import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ContactFormModel } from '../../models/requests/contact/contact-form-model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl:string = `${environment.API_URL}/contact/send-email`;

  constructor(private http: HttpClient) {}

  sendContactForm(formData: ContactFormModel): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
