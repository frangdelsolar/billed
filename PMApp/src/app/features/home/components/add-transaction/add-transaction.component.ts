import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { QueryService } from '@core/services/query.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  form!: FormGroup;
  currency = new FormControl('ARS', [Validators.required]);
  amount = new FormControl(0, [Validators.required, Validators.min(0)]);
  exchange_rate = new FormControl('', []);
  category = new FormControl('', [Validators.required]);
  completed = new FormControl(false, [Validators.required]);
  date_of_transaction = new FormControl(new Date(), [Validators.required]);
  description = new FormControl('', [Validators.required]);
  recurrent = new FormControl({value: false, disabled: false}, [Validators.required]);
  repeats = new FormControl({value: false, disabled: false}, [Validators.required]);
  repetitions = new FormControl(0, [Validators.required]);
  frequency = new FormControl('', [Validators.required]);
  ignore = new FormControl({value: false, disabled: false}, [Validators.required]);
  notes = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);


  transactionType: string = "";
  $transactionType: BehaviorSubject<any> = new BehaviorSubject('');
  transactionTypeLabel: string = "";
  repetitionOn: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private service: TransactionService,
    private querySvc: QueryService,
    private router: Router,
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
    }
  }

  onRepeatsChange(){
    if (this.repeats.value && this.recurrent.enabled){
      this.recurrent.setValue(false);
    }
  }

  onSubmitForm(){
    console.log(this.form.value)
      this.service.create(this.form.value).subscribe(
        (res)=>{
          let date = new Date()
          if (this.date_of_transaction.value){
            date = this.date_of_transaction.value;
          }
          this.querySvc.setDateToQuery(date.getMonth()+1, date.getFullYear());
          this.querySvc.setTransactionType(this.transactionType);
          this.router.navigate(['transacciones']);
        },
        (err)=>{
          console.log(err);
        }
      )
    }
}

