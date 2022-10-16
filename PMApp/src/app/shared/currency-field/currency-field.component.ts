import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PrivateApiService } from '@core/services/privateApi.service';
import { currencies } from './currencies';

@Component({
  selector: 'app-currency-field',
  templateUrl: './currency-field.component.html',
  styleUrls: ['./currency-field.component.scss']
})
export class CurrencyFieldComponent implements OnInit {
  
  @Input() in_currency: string = "ARS";
  @Input() in_amount: number = 0;
  @Output() out_selection: EventEmitter<any> = new EventEmitter();

  currencies = currencies;
  exchangeHint:string = "";
  amountHint:string = "";

  exchange_rate: FormControl = new FormControl(1, []);

  constructor(private service:PrivateApiService) { }

  ngOnInit(): void {

  }

  getUSDRate(){
    let url = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    return this.service.get(url, null, false);
  }

  getCurrencyRate(){
    
  }

  setHint(){

    if (this.in_currency == 'USD'){
      this.getUSDRate().subscribe((res:any)=>{
        this.exchange_rate.setValue(res.venta);
        this.exchangeHint = "USD $1 = ARS $" + (res.venta).toString() + " cotización blue";
        this.amountHint = "= ARS $" + (this.in_amount * res.venta).toString();
      });
    } else {
      this.amountHint="";
      this.exchangeHint="";
      this.getCurrencyRate()
    }
    this.emitOutput();
  }

  emitOutput(){
    this.out_selection.emit(
      {
        currency: this.in_currency, 
        amount: this.in_amount, 
        exchange_rate: this.exchange_rate.value
      }
    )
  }

}
