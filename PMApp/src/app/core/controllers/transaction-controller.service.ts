import { Injectable } from '@angular/core';
import { Income } from '@core/models/income.interface';
import { Transaction } from '@core/models/transaction.interface';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '../services/privateApi.service';



@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  
  _apiUrl = environment.apiUrlTransaction;

  constructor(private adminSvc: PrivateApiService) {}

  public get(params?: string){
    let url = params ? this._apiUrl + `/${params}` : this._apiUrl + '/';
    return this.adminSvc.get<Transaction|Transaction[]>(url, null, true);
  }

  public getAll(){
    return this.adminSvc.get<Transaction[]>(this._apiUrl, null, true);
  }

  public create(body: Income){
    let url = this._apiUrl + '/';
    return this.adminSvc.post<Income>(url, body, true);
  }

}