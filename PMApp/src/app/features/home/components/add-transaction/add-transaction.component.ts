import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { QueryService } from '@core/services/query.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transaction-income',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  action: string = "Transacción";

  form!: FormGroup;

  showRepetitions: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private fb: FormBuilder, 
    private svc: TransactionService,
    private querySvc: QueryService,
    private router: Router
  ) { 
    this.form = fb.group({
      currency: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      exchange_rate: new FormControl('', []),
      category: new FormControl('', [Validators.required]),
      completed: new FormControl(false, [Validators.required]),
      date_of_transaction: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      recurrent: new FormControl(false, [Validators.required]),
      repeats: new FormControl(false, [Validators.required]),
      repetitions: new FormControl('', []),
      frequency: new FormControl('', []),
      notes: new FormControl('', []),
      ignore: new FormControl(false, [Validators.required]),
      type: new FormControl('expense', [Validators.required])
    });

  }

  ngOnInit(): void {
    if (this.querySvc.params['transaction_type'] == 'income'){
      this.action = "Ingreso";
    } else if (this.querySvc.params['transaction_type'] == 'expense'){
      this.action = "Gasto";
    } else {
      // console.error('Tipo de transaccion invalido');
      this.router.navigate(['/']);
    }
  }

  onSelectCurrency(value: any){
    this.form.get('currency')?.setValue(value.currency);
    this.form.get('amount')?.setValue(value.amount);
    this.form.get('exchange_rate')?.setValue(value.exchange_rate);
  }

  onCategorySelection(value: number|null){
    this.form.get('category')?.setValue(value);
  }

  onRecurrentToggle(){
    this.showRepetitions.next(false);
    this.form.get('repeats')?.setValue(false);
    this.form.get('repetitions')?.reset();
    this.form.get('frequency')?.reset();
    this.form.get('repetitions')?.clearValidators();
    this.form.get('frequency')?.clearValidators();
  }

  onRepeatsToggle(){
    let showRepetitions = !this.form.get('repeats')?.value;
    this.showRepetitions.next(showRepetitions);
    if (showRepetitions){
      this.form.get('recurrent')?.setValue(false);
      this.form.get('repetitions')?.setValidators([Validators.required]);
      this.form.get('frequency')?.setValidators([Validators.required]);
    }  else {
      this.form.get('repetitions')?.clearValidators();
      this.form.get('frequency')?.clearValidators();
    }
  }

  onSubmitForm(){
    console.log(this.form.valid)
    console.log(this.form.value)
    if (this.querySvc.params['transaction_type'] == 'income'){
      this.form.value.type = 'income';
    } else if (this.querySvc.params['transaction_type'] == 'expense'){
      this.form.value.type = 'expense';
    } else {
      console.error('Tipo de transaccion invalido');
      this.router.navigate(['/']);
    }
    if (this.form.valid){
      this.svc.create(this.form.value).subscribe(res=>{
        this.router.navigate(['/']);
      })
    } else {
    }
  }

  onClearForm(){
    this.form.reset();
  }

}

