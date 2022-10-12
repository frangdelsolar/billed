import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { Transaction } from '@core/models/transaction.interface';

@Component({
  selector: 'app-item-transaction',
  templateUrl: './item-transaction.component.html',
  styleUrls: ['./item-transaction.component.scss']
})
export class ItemTransactionComponent implements OnInit {

  @Input() transaction?: Transaction;

  constructor() { }

  ngOnInit(): void {
  }

  onTransactionClick(id:any){
    console.log(id)
  }
}
