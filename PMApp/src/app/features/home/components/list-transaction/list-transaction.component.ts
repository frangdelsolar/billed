import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { Transaction } from '@core/models/transaction.interface';
import { QueryService } from '@core/services/query.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.scss']
})
export class ListTransactionComponent implements OnInit {

  title: string | undefined;
  transactions: Transaction[] = [];
  selectedDate: any;

  transactionFormControl = new FormControl(null, []);
  constructor(
    private querySvc: QueryService,
    private service: TransactionService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.setupDateSelection();
    this.setupTitle();
    this.getRecords();
  }

  setupTitle(){
    this.transactionFormControl.setValue(this.querySvc.params['transaction_type']);
    if (this.querySvc.params['transaction_type'] == 'income'){
      this.title = "Ingresos";
    } else if (this.querySvc.params['transaction_type'] == 'expense'){
      this.title = "Gastos";
    } else {
      this.title = "Transacciones";
    }
  }
  
  setupDateSelection(){
    let year = this.querySvc.params['year'];
    let month = this.querySvc.params['month']-1;
    this.selectedDate = new Date();
    if (year && month > -1){
      this.selectedDate.setFullYear(year)
      this.selectedDate.setMonth(month)
    }
  }

  getRecords(){
    let params = this.querySvc.getParamsString();
    this.service.getAll(params).subscribe(
      (res)=>{
        this.transactions=res
      },
      (err)=>{
        this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
      }
      );
  }
  
  setDate(dateParams: {[key:string]: number}){
    this.querySvc.setDateToQuery(dateParams['month'], dateParams['year'])
    this.getRecords();
  }

  setTransactionType(){
    this.querySvc.setTransactionType(this.transactionFormControl.value);
    this.getRecords();
  }

}
