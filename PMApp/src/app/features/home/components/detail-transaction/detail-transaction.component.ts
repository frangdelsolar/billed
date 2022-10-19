import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayService } from '@core/controllers/pay-controller.service';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { Transaction } from '@core/models/transaction.interface';
import { QueryService } from '@core/services/query.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.scss'],
})
export class DetailTransactionComponent implements OnInit {

  transactionId!: number;
  transaction!: Transaction;

  constructor(
    private messageService: MessageService,
    private service: TransactionService,
    private querySvc: QueryService,
    private paySvc: PayService, 
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res=>{
      this.transactionId = res['id'];
    })
    this.service.get(this.transactionId).subscribe(
      (res)=>{
        this.transaction=res
      },
      (err)=> {
        this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
        this.router.navigate(['/'])
      }
    );
  }

  onEditClick(){
    this.querySvc.setTransactionType(this.transaction.type);
    this.router.navigate(['transacciones', this.transactionId, 'editar']);
  }
  
  onPayClick(){
    this.paySvc.post(this.transactionId).subscribe(
      (res)=>{
        this.transaction=res;
        this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Se ha registrado el pago'});
      },
      (err)=>{
        this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
      }
    )
  }

}
