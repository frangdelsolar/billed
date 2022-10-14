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

  currencies = currencies;
  exchangeHint:string = "";
  amountHint:string = "";

  @Output() currencyValueSelector: EventEmitter<any> = new EventEmitter();

  @Input() currencySelected: string="ARS";
  @Input() amountInput:number=0;
  currency: FormControl = new FormControl('ARS', [Validators.required]);
  amount: FormControl = new FormControl("", [Validators.required]);
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

    if (this.currency.value == 'USD'){
      this.getUSDRate().subscribe((res:any)=>{
        this.exchange_rate.setValue(res.venta);
        this.exchangeHint = "USD $1 = ARS $" + (res.venta).toString() + " cotización blue";
        this.amountHint = "= ARS $" + (this.amount.value * res.venta).toString();
      });
    } else {
      this.amountHint="";
      this.exchangeHint="";
      this.getCurrencyRate()
    }
    this.emitOutput();
  }

  emitOutput(){
    this.currencyValueSelector.emit(
      {
        currency: this.currency.value, 
        amount: this.amount.value, 
        exchange_rate: this.exchange_rate.value
      }
    )
  }

}
