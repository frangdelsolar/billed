import { Injectable } from '@angular/core';
import { PrivateApiService } from '@core/services/privateApi.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  
  _apiUrl = environment.apiUrlPay;

  constructor(private adminSvc: PrivateApiService) {}

  public post(id: number){
    let url = this._apiUrl + `/${id}` ;
    return this.adminSvc.post<any>(url, null, true);
  }
}
