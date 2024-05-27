import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private readonly apiUrl:string = `${environment.API_URL}/certificates`


  constructor(private http: HttpClient) { }

  createCertificate( bootcampId: string): Observable<any> {
    return this.http.post(this.apiUrl, { bootcampId });
  }

  getCertificate(certificateId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${certificateId}`, { responseType: 'blob' });
  }
}

//Component yapısı şu şekilde olacak takriben ....

// export class CertificateComponent {
//     userName: string = '';
//     courseName: string = '';
//     certificateId: string = '';
  
//     constructor(private certificateService: CertificateService) { }
  
//     createCertificate() {
//       this.certificateService.createCertificate(this.BootcampId)
//         .subscribe(id => {
//           this.BootcampId = id;
//         });
//     }
  
//     downloadCertificate() {
//       if (this.certificateId) {
//         this.certificateService.getCertificate(this.certificateId)
//           .subscribe(response => {
//             const blob = new Blob([response], { type: 'application/pdf' });
//             const url = window.URL.createObjectURL(blob);
//             window.open(url);
//           });
//       }
//     }
//   }