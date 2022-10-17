import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { QueryService } from '@core/services/query.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {
  form!: FormGroup;
  dateOfTransaction: Date = new Date();
  repetitionOn: boolean = false;
  transactionType: string = "";
  transactionTypeLabel: string = "";

  transactionId?: number;
  transactionInstance?: any;

  constructor(
    private fb: FormBuilder, 
    private service: TransactionService,
    private querySvc: QueryService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.form = fb.group({
      currency: new FormControl('ARS', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      exchange_rate: new FormControl('', []),
      category: new FormControl('', [Validators.required]),
      completed: new FormControl(false, [Validators.required]),
      date_of_transaction: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      recurrent: new FormControl(false, [Validators.required]),
      repeats: new FormControl(false, [Validators.required]),
      repetitions: new FormControl(1, []),
      frequency: new FormControl('months', []),
      notes: new FormControl('', []),
      ignore: new FormControl(false, [Validators.required]),
      type: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

    // this.form.controls['type'].setValue(this.transactionType);

    this.setup();
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
            } else if (res.type == 'expense'){
              this.transactionTypeLabel = "Gasto";
              this.transactionType = "expense";
            } else {
              console.log('Error');
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
    for (let key of Object.keys(this.transactionInstance)){
        let value = this.transactionInstance[key];
        if (key == 'date_of_transaction'){
          value = new Date(value);
        }
        this.form.controls[key]?.setValue(value);
    }
  }

  onCurrencyFieldChange(data: any){
    this.form.controls['amount'].setValue(data.amount);
    this.form.controls['currency'].setValue(data.currency);
    this.form.controls['exchange_rate'].setValue(data.exchange_rate);
  }

  onRecurrentChange(){
    if (this.form.controls['recurrent'].value==true){
      this.repetitionOn = false;
    }
  }

  onRepetitionChange(data: any){
    this.repetitionOn = data.repetitionOn;
    if (this.repetitionOn){
      this.form.controls['recurrent'].setValue(false);
    }
    this.form.controls['repeats'].setValue(data.repetitionOn);
    this.form.controls['repetitions'].setValue(data.repetitions);
    this.form.controls['frequency'].setValue(data.frequency);
  }

  onCategorySelection(value: string){
    this.form.controls['category'].setValue(value);
  }

  validateForm(): boolean{
    let result = this.form.valid && this.form.controls['amount'].value > 0;
    return result;
  }

  onDelete(){
    if(this.transactionId){
      this.service.delete(this.transactionId).subscribe(
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
    console.log(this.form.value)
    // let formValidationResult = this.validateForm();
    // if(formValidationResult){
    //   this.service.create(this.form.value).subscribe(
    //     (res)=>{
    //       this.querySvc.setDateToQuery(this.dateOfTransaction.getMonth()+1, this.dateOfTransaction.getFullYear());
    //       this.querySvc.setTransactionType(this.transactionType);
    //       this.router.navigate(['transacciones']);
    //     },
    //     (err)=>{
    //       console.log(err);
    //     }
    //   )
    // }
  }
}

