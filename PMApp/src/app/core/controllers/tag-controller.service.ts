import { Injectable } from '@angular/core';
import { Tag } from '@core/models/tag.interface';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '../services/privateApi.service';



@Injectable({
  providedIn: 'root',
})
export class TagService {
  
  _apiUrl = environment.apiUrlTag;

  constructor(private adminSvc: PrivateApiService) {}

  public get(id: number){
    return this.adminSvc.get<Tag>(this._apiUrl, id, true);
  }

  public getResults(search: string){
    let url = this._apiUrl + `?search=${search}`;
    return this.adminSvc.get<Tag[]>(url, null, true);

  }

  public getAll(){
    return this.adminSvc.get<Tag[]>(this._apiUrl, null, true);
  }
  
  public create(body: any){
    let url = this._apiUrl + '/';
    return this.adminSvc.post<any>(url, body, true);
  }

  public update(id: number, body: any){
    let url = `${this._apiUrl}/${id}/`;
    return this.adminSvc.put<any>(url, body, true);
  }

  public delete(id: number){
    let url = `${this._apiUrl}/${id}/`
    return this.adminSvc.delete<any>(url, true);
  }
}