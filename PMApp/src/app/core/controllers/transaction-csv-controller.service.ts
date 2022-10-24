import { Injectable } from '@angular/core';
import { Balance } from '@core/models/balance.interface';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '../services/privateApi.service';



@Injectable({
  providedIn: 'root',
})
export class TransactionCSVService {
  
  _apiUrl = environment.apiUrlCsv;

  constructor(private adminSvc: PrivateApiService) {}

  public post(body: any){
    return this.adminSvc.post<any>(this._apiUrl, body, true);
  }

  public download(params: any){
    let url = this._apiUrl + params;
    
    return this.adminSvc.downloadFile(url, true);
  }
}