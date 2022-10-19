import { Injectable } from '@angular/core';
import { Category } from '@core/models/category.interface';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '../services/privateApi.service';



@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
  _apiUrl = environment.apiUrlCategory;

  constructor(private adminSvc: PrivateApiService) {}

  public get(id: number){
    return this.adminSvc.get<Category>(this._apiUrl, id, true);
  }

  public getByType(type: string){
    let url = this._apiUrl + `?search=${type}`;
    return this.adminSvc.get<Category[]>(url, null, true);
  }

}