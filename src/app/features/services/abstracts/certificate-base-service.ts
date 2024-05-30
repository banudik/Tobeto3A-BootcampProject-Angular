import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateCertificateRequest } from "../../models/requests/certificate/create-certificate-request";



@Injectable()
export abstract class CertificateBaseService {

//   abstract getList(pageRequest:PageRequest):
//   Observable<BootcampStateListItemDto>;
//   abstract getById(id:number):
//   Observable<GetByIdBootcampStateResponse>;
  abstract createAndDownloadCertificate(request:CreateCertificateRequest)
  :Observable<Blob>;

}