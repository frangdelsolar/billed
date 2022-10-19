import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PrivateApiService } from '@core/services/privateApi.service';
import { MessageService } from 'primeng/api';
import { currencies } from './currencies';

@Component({
  selector: 'app-currency-field',
  templateUrl: './currency-field.component.html',
  styleUrls: ['./currency-field.component.scss']
})
export class CurrencyFieldComponent implements OnInit {
  
  @Input() in_currencyFormControl = new FormControl('', []);
  @Input() in_amountFormControl = new FormControl(0, []);
  @Output() out_exchangeRate: EventEmitter<any> = new EventEmitter();

  currencies = currencies;
  exchangeHint:string = "";
  amountHint:string = "";


  constructor(
    private messageService: MessageService,
    private service:PrivateApiService
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.setHint();
    }, 1000)

  }

  getUSDRate(){
    let url = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    return this.service.get(url, null, false);
  }

  getCurrencyRate(){
    this.out_exchangeRate.emit(1);
  }

  setHint(){
    let amount = 0;
    if (this.in_amountFormControl.value){
      amount = this.in_amountFormControl.value;
    }

    if (this.in_currencyFormControl.value == 'USD'){
      this.getUSDRate().subscribe(
        (res:any)=>{
          this.out_exchangeRate.emit(res.venta);
          this.exchangeHint = "USD $1 = ARS $" + (res.venta).toString() + " cotización blue";
          this.amountHint = "= ARS $" + (amount * res.venta).toString();
        },
        (err)=>{
          this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
        }
      );
    } else {
      this.amountHint="";
      this.exchangeHint="";
      this.getCurrencyRate();
    }
  }


}
