import { Component, OnInit } from '@angular/core';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { Transaction } from '@core/models/transaction.interface';
// import { Transaction } from '@core/models/transaction.interface';
import { QueryService } from '@core/services/query.service';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.scss']
})
export class ListTransactionComponent implements OnInit {

  title: string | undefined;
  transactions: Transaction[] = [];
  selectedDate: any;
  selectedType: any;

  constructor(
    private querySvc: QueryService,
    private service: TransactionService
  ) { }

  ngOnInit(): void {
    this.selectedDate = {
      month: this.querySvc.params['month'],
      year: this.querySvc.params['year'],
    }
    this.selectedType = this.querySvc.params['transaction_type'];
    console.log(this.selectedType)
    if (this.querySvc.params['transaction_type'] == 'income'){
      this.title = "Ingresos";
    } else if (this.querySvc.params['transaction_type'] == 'expense'){
      this.title = "Gastos";
    } else {
      this.title = "Transacciones";
    }
    this.getRecords();
  }

  getRecords(){
    let params = this.querySvc.getParamsString()
    this.service.getAll().subscribe(res=>this.transactions=res)
  }
  
  setDate(dateParams: {[key:string]: number}){
    this.querySvc.setDateToQuery(dateParams['month'], dateParams['year'])
    this.getRecords();
  }

  setTransactionType(value:string){
    this.querySvc.setTransactionType(value);
    this.getRecords();
  }

}
