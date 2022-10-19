import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { QueryService } from '@core/services/query.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {
  
  transactionId?: number;
  transactionInstance?: any;

  form!: FormGroup;
  currency = new FormControl('ARS', [Validators.required]);
  amount = new FormControl(0, [Validators.required, Validators.min(0.01)]);
  exchange_rate = new FormControl('', []);
  category = new FormControl(null, [Validators.required]);
  completed = new FormControl(false, [Validators.required]);
  date_of_transaction = new FormControl(new Date(), [Validators.required]);
  description = new FormControl('', [Validators.required]);
  recurrent = new FormControl(false, [Validators.required]);
  ignore = new FormControl(false, [Validators.required]);
  notes = new FormControl('', []);
  bulk_mode = new FormControl('', [Validators.required]);
  
  markAllAsDirty = markAllAsDirty;

  transactionType: string = "";
  $transactionType: BehaviorSubject<any> = new BehaviorSubject('');
  transactionTypeLabel: string = "";

  bulkEditSectionVisible = false;
  saveDeleteButtonDisabled = false;

  editionBulk = [
    {
      value: 'single',
      name: 'Esta cuota'
    },
    {
      value: 'pending',
      name: 'Cuotas pendientes'
    },
    {
      value: 'all',
      name: 'Todas las cuotas'
    }
  ]

  constructor(
    private fb: FormBuilder, 
    private service: TransactionService,
    private querySvc: QueryService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) { 
    this.form = fb.group({
      currency: this.currency,
      amount: this.amount,
      exchange_rate: this.exchange_rate,
      category: this.category,
      completed: this.completed,
      date_of_transaction: this.date_of_transaction,
      description: this.description,
      recurrent: this.recurrent,
      ignore: this.ignore,
      notes: this.notes,
      bulk_mode: this.bulk_mode
    });

    this.setup();

  }

  ngOnInit(): void {
  }


  setup(){
    this.route.params.subscribe(params=>{
      this.transactionId = params['id'];
      if (this.transactionId){
        this.service.get(this.transactionId).subscribe(
          (res)=>{
            this.transactionInstance = res;
            if(res.type == 'income'){
              this.transactionTypeLabel = "Ingreso";
              this.transactionType = "income";
              this.$transactionType.next('income');
            } else if (res.type == 'expense'){
              this.transactionTypeLabel = "Gasto";
              this.transactionType = "expense";
              this.$transactionType.next('expense');
            } else {
              this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Tipo de transacción desconocido'});
              this.router.navigate(['/']);
            }


            if (this.transactionInstance.installment || this.transactionInstance.recurrent){
              this.saveDeleteButtonDisabled = true;
              this.bulkEditSectionVisible = true;
            } else {
              this.bulk_mode.setValue('single');
            }
            this.prefill();
          },
          (err)=>{
            this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
            this.router.navigate(['/']);
          }
        )
      }
    })
  }

  prefill(){
    let data = this.transactionInstance;
    this.currency.setValue(data.currency);
    this.amount.setValue(data.amount);
    this.category.setValue(data.payment_item.category.id);
    this.completed.setValue(data.completed);
    this.date_of_transaction.setValue(new Date(data.date_of_transaction));
    this.description.setValue(data.description);
    if (data.recurrent){
      this.recurrent.setValue(true);
    }
    this.notes.setValue(data.notes);
    this.ignore.setValue(data.ignore);
  }

  onCurrencyChange(value: any){
    this.exchange_rate.setValue(value);
  }

  onBulkModeChange(){
    if (this.bulk_mode.value){
      this.saveDeleteButtonDisabled = false;
    } else {
      this.saveDeleteButtonDisabled = true;
    }
  }
  
  onDelete(){
    if(this.transactionId && this.bulk_mode.value){
      let param = `bulk_mode=${this.bulk_mode.value}`;
      this.service.delete(this.transactionId, param).subscribe(
        (res)=>{
          this.messageService.add({severity:'success', summary:'Operación exitosa', detail:`Transacción/es eliminada/s`});
        },
        (err)=>{
          this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
        }
      )
    }
  }




  onSubmitForm(){
    console.log(this.form.value)
    if (this.form.valid){
      if(this.transactionId){
        let param = `bulk_mode=${this.bulk_mode.value}`;
        this.service.update(this.transactionId, this.form.value, param).subscribe(
          (res)=>{
            this.setup();
            let date = this.date_of_transaction.value;
            if (date){
              this.querySvc.setDateToQuery(date.getMonth()+1, date.getFullYear());
            }
            this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Se ha/n editado la/s transacción/es'});
            this.querySvc.setTransactionType(this.transactionType);
            this.router.navigate(['transacciones']);
          },
          (err)=>{
            this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
          }
        )
      } else {
        this.markAllAsDirty(this.form);
      }
  
    }

  }
}

