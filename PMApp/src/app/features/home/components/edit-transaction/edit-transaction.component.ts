import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { QueryService } from '@core/services/query.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';

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
  category = new FormControl('', [Validators.required]);
  completed = new FormControl(false, [Validators.required]);
  date_of_transaction = new FormControl(new Date(), [Validators.required]);
  description = new FormControl('', [Validators.required]);
  recurrent = new FormControl(false, [Validators.required]);
  repeats = new FormControl(false, [Validators.required]);
  repetitions = new FormControl(1, []);
  frequency = new FormControl('months', []);
  ignore = new FormControl(false, [Validators.required]);
  notes = new FormControl('', []);
  bulk_mode = new FormControl('', [Validators.required]);
  
  markAllAsDirty = markAllAsDirty;

  transactionType: string = "";
  $transactionType: BehaviorSubject<any> = new BehaviorSubject('');
  transactionTypeLabel: string = "";
  repetitionOn: boolean = false;

  editionBulk = [
    {
      value: 'single',
      name: 'Solo este registro'
    },
    {
      value: 'pending',
      name: 'Pendientes'
    },
    {
      value: 'all',
      name: 'Repeticiones'
    }
  ]

  constructor(
    private fb: FormBuilder, 
    private service: TransactionService,
    private querySvc: QueryService,
    private router: Router,
    private route: ActivatedRoute
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
              console.log('Error - Tipo de transaccion desconocido');
              this.router.navigate(['/']);
            }
            this.prefill();
          },
          (err)=>{
            console.log(err);
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
    if (data.installment){
      this.repeats.setValue(true);
      this.repetitions.setValue(data.installment.repetitions);
      this.frequency.setValue(data.installment.freuquency);
    }
    this.notes.setValue(data.notes);
    this.ignore.setValue(data.ignore);
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

  onDelete(){
    if(this.transactionId && this.bulk_mode.value){
      let param = `bulk_mode=${this.bulk_mode.value}`;
      this.service.delete(this.transactionId, param).subscribe(
        (res)=>{
          console.log(res);
        },
        (err)=>{
          console.log(err)
        }
      )
    }
  }




  onSubmitForm(){
    // if (this.form.valid){
      if(this.transactionId){
        let param = `bulk_mode=${this.bulk_mode.value}`;
        this.service.update(this.transactionId, this.form.value, param).subscribe(
          (res)=>{
            console.log(res)
            this.setup();
            // this.querySvc.setDateToQuery(this.dateOfTransaction.getMonth()+1, this.dateOfTransaction.getFullYear());
            // this.querySvc.setTransactionType(this.transactionType);
            // this.router.navigate(['transacciones']);
          },
          (err)=>{
            console.log(err);
          }
        )
      // } else {
        this.markAllAsDirty(this.form);
      }
  
    }

    
}

