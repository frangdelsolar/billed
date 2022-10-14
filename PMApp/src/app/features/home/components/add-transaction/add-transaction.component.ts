import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  actionType: string = "";

  form!: FormGroup;

  showRepetitions: BehaviorSubject<boolean> = new BehaviorSubject(false);

  transactionId?: number;
  dateSelected: Date = new Date();

  constructor(
    private fb: FormBuilder, 
    private service: TransactionService,
    private querySvc: QueryService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.form = fb.group({
      currency: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
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
    this.initialSetup();
    this.setEditionMode();
  }

  setEditionMode(){
    this.route.params.subscribe(res=>{
      let id = res['id'];
      if (id){
        this.transactionId = id;
        this.prefill();
      }
    });
  }

  prefill(){
    if (this.transactionId){
      this.service.get(this.transactionId).subscribe(
        (res)=>{
          
          this.form.get('currency')?.setValue(res.currency);
          this.form.get('amount')?.setValue(res.amount);
          this.form.get('exchange_rate')?.setValue(res.payment_item?.currency?.exchange_rate);
          this.form.get('category')?.setValue(res.payment_item?.category);
          this.form.get('completed')?.setValue(res.completed);
          this.form.get('date_of_transaction')?.setValue(res.date_of_transaction);
          this.dateSelected = new Date(res.date_of_transaction);
          this.form.get('description')?.setValue(res.description);
          this.form.get('recurrent')?.setValue(res.payment_item?.recurrent);
          // this.form.get('repeats')?.setValue(res.repeats);
          // this.form.get('repetitions')?.setValue(res.repetitions);
          // this.form.get('frequency')?.setValue(res.frequency);
          this.form.get('notes')?.setValue(res.notes);
          this.form.get('ignore')?.setValue(res.ignore);
          this.form.get('type')?.setValue(res.type);
  
        },
        (err)=>{
          this.router.navigate(['/']);
        }
      )
    }
  }

  initialSetup(){
    if (this.querySvc.params['transaction_type'] == 'income'){
      this.action = "Ingreso";
      this.actionType = "income";
    } else if (this.querySvc.params['transaction_type'] == 'expense'){
      this.action = "Gasto";
      this.actionType = "expense";
    } else {
      // console.error('Tipo de transaccion invalido');
      // this.router.navigate(['/']);
    }
  }

  onFrequencyChange(value:any){
    this.form.get('frequency')?.setValue(value);
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
    let showRepetitions = this.form.get('repeats')?.value;
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
    if (this.querySvc.params['transaction_type'] == 'income'){
      this.form.value.type = 'income';
    } else if (this.querySvc.params['transaction_type'] == 'expense'){
      this.form.value.type = 'expense';
    } else {
      console.error('Tipo de transaccion invalido');
      this.router.navigate(['/']);
    }
    if (this.form.valid){
      this.service.create(this.form.value).subscribe(res=>{
        this.router.navigate(['/']);
      })
    } else {
    }
  }

  onClearForm(){
    this.form.reset();
  }

}

