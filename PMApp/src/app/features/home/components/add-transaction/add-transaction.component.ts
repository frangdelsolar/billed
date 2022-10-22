import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { QueryService } from '@core/services/query.service';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  form!: FormGroup;
  currency = new FormControl('ARS', [Validators.required]);
  amount = new FormControl(0, [Validators.required, Validators.min(0.01)]);
  exchange_rate = new FormControl('', []);
  category = new FormControl(null, [Validators.required]);
  completed = new FormControl(false, [Validators.required]);
  date_of_transaction = new FormControl(new Date(), [Validators.required]);
  description = new FormControl('', [Validators.required]);
  recurrent = new FormControl(false, [Validators.required]);
  repeats = new FormControl(false, [Validators.required]);
  repetitions = new FormControl(1, []);
  frequency = new FormControl('months', []);
  notes = new FormControl('', []);
  type = new FormControl('', [Validators.required]);

  markAllAsDirty = markAllAsDirty;


  transactionType: string = "";
  $transactionType: BehaviorSubject<any> = new BehaviorSubject('');
  transactionTypeLabel: string = "";
  repetitionOn: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private service: TransactionService,
    private querySvc: QueryService,
    private router: Router,
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
      repeats: this.repeats,
      repetitions: this.repetitions,
      frequency: this.frequency,
      notes: this.notes,
      type: this.type
    });
  }

  ngOnInit(): void {
    this.$transactionType.next(this.querySvc.params['transaction_type'])
    if (this.querySvc.params['transaction_type'] == 'income'){
      this.transactionTypeLabel = "Ingreso";
      this.transactionType = "income";
    } else if (this.querySvc.params['transaction_type'] == 'expense'){
      this.transactionTypeLabel = "Gasto";
      this.transactionType = "expense";
    } else {
      console.error('Tipo de transaccion invalido');
      this.router.navigate(['/']);
    }
    this.form.controls['type'].setValue(this.transactionType);
  }

  onCurrencyChange(value: any){
    this.exchange_rate.setValue(value);
  }
  
  onRecurrentChange(){
    if (this.recurrent.value && this.repeats.enabled){
      this.repeats.setValue(false);
      this.frequency.clearValidators();
      this.repetitions.clearValidators();
    }
  }

  onRepeatsChange(){
    if (this.repeats.value && this.recurrent.enabled){
      this.recurrent.setValue(false);
      this.frequency.setValidators([Validators.required]);
      this.repetitions.setValidators([Validators.required, Validators.min(1)]);
    }
  }



  onSubmitForm(){
    if (this.form.valid){
      this.service.create(this.form.value).subscribe(
        (res)=>{
          let date = new Date()
          if (this.date_of_transaction.value){
            date = this.date_of_transaction.value;
          }
          this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Se ha registrado la transacción'});
          this.querySvc.setDateToQuery(date.getMonth()+1, date.getFullYear());
          this.querySvc.setTransactionType(this.transactionType);
          this.router.navigate(['transacciones']);
        },
        (err)=>{
          this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
        }
      )
    } else {
      this.markAllAsDirty(this.form);
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Parece que falta completar algo.'});
    }

    }
}

