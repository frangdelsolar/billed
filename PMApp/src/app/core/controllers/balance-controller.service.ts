import { Injectable } from '@angular/core';
import { Balance } from '@core/models/balance.interface';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '../services/privateApi.service';



@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  
  _apiUrl = environment.apiUrlBalance;

  constructor(private adminSvc: PrivateApiService) {}

  public get(params?: string){
    let url = params ? this._apiUrl + `${params}` : this._apiUrl;
    return this.adminSvc.get<Balance>(url, null, true);
  }

}