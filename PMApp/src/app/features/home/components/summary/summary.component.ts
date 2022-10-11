import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '@core/services/query.service';
import { BehaviorSubject } from 'rxjs';
import { BalanceService } from 'src/app/core/controllers/balance-controller.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  total!: string;
  ingresos!: string;
  gastos!: string;
  
  totalDisplayValue: BehaviorSubject<string> = new BehaviorSubject(this.total);
  ingresosDisplayValue: BehaviorSubject<string> = new BehaviorSubject(this.ingresos);
  gastosDisplayValue: BehaviorSubject<string> = new BehaviorSubject(this.gastos);
  hideTotals: boolean = false;

  constructor(private service: BalanceService, private querySvc: QueryService, private router: Router) {

  }

  ngOnInit(): void {
    let today = new Date(Date.now());
    this.querySvc.setDateToQuery(today.getMonth()+1, today.getFullYear())
    this.getTotals();
  }

  getTotals(){
    let params = this.querySvc.getParamsString();

    this.service.get(params).subscribe(res => {
      this.ingresos = res.income;
      this.gastos = res.expense;
      this.total = res.total;
      if (!this.hideTotals) this.refreshDisplayValues();
    })

  }

  setDate(dateParams: any){
    console.log(dateParams)
    this.querySvc.setDateToQuery(dateParams['month'], dateParams['year'])
    this.getTotals();
  }

  onVisibilityClick(){
    if (this.hideTotals) {
      this.hideTotals = false;
      this.refreshDisplayValues();
    } else {
      this.hideTotals = true;
      this.hideDisplayValues();
    }
  }

  hideDisplayValues(){
    this.totalDisplayValue.next("*****,**");
    this.ingresosDisplayValue.next("*****,**");
    this.gastosDisplayValue.next("*****,**");
  }

  refreshDisplayValues(){
    this.totalDisplayValue.next(this.total);
    this.ingresosDisplayValue.next(this.ingresos);
    this.gastosDisplayValue.next(this.gastos);
  }

  onGoToAddTransaction(type: string){
    this.querySvc.setTransactionType(type);
    this.router.navigate(['/nueva-transaccion']);
  }

  onGoToListTransaction(type?: string){
    this.querySvc.setTransactionType(type);
    this.router.navigate(['/transacciones']);
  }
}
