import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  params: {[key: string]: any} = {
    transaction_type: null,
    month: null,
    year: null
  }

  constructor() { }

  setTransactionType(type: string | undefined){
    this.params['transaction_type'] = type;
  }

  setDateToQuery(month: number, year: number){
    this.params['month'] = month;
    this.params['year'] = year;
  }

  getParamsString(){
    let paramString = "";

    for (let [key, value] of Object.entries(this.params)){
      if (value != null && value != undefined){
        if (paramString == ""){
          paramString += "?";
        } else {
          paramString += "&";
        }
        paramString += `${key}=${value}`
      }
    }
    return paramString;
  }
}
