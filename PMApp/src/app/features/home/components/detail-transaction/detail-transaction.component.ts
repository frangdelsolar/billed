import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayService } from '@core/controllers/pay-controller.service';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { Transaction } from '@core/models/transaction.interface';

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.scss']
})
export class DetailTransactionComponent implements OnInit {

  transactionId!: number;
  transaction!: Transaction;

  constructor(
    private service: TransactionService,
    private paySvc: PayService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(res=>{
      this.transactionId = res['id'];
    })
    this.service.get(this.transactionId).subscribe(
      (res)=>{
        this.transaction=res
      },
      (err)=> {
        this.router.navigate(['/'])
      }
    );
  }

  onEditClick(){
    this.router.navigate(['transacciones', this.transactionId, 'editar']);
  }
  
  onPayClick(){
    this.paySvc.post(this.transactionId).subscribe(
      res=>{
        this.transaction=res
      }
    )
  }

}
