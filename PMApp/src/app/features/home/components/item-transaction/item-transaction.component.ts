import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { Transaction } from '@core/models/transaction.interface';

@Component({
  selector: 'app-item-transaction',
  templateUrl: './item-transaction.component.html',
  styleUrls: ['./item-transaction.component.scss']
})
export class ItemTransactionComponent implements OnInit {

  @Input() transaction?: Transaction;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onTransactionClick(id:any){
    this.router.navigate(['transacciones', id]);
  }
}
