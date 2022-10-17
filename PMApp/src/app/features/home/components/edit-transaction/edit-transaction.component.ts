import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@core/controllers/transaction-controller.service';
import { QueryService } from '@core/services/query.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
  $transactionType: BehaviorSubject<string> = new BehaviorSubject("");
  categoryId: number = 0;
  $categoryId: BehaviorSubject<number> = new BehaviorSubject(0);
  transactionTypeLabel: string = "";

  transactionId?: number;
  transactionInstance?: any;

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

  bulkEditSelection?: any;

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
      type: new FormControl('', [Validators.required]),
      bulk_mode: new FormControl('', [Validators.required])
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
    let data = this.transactionInstance;

    this.form.controls['currency']?.setValue(data.currency)
    this.form.controls['amount']?.setValue(data.amount)
    this.form.controls['exchange_rate']?.setValue(data.payment_item.currency.exchange_rate)
    this.form.controls['category']?.setValue(data.payment_item.category.id)

    this.$transactionType.next(data.type)
    this.$categoryId.next(data.payment_item.category.id)

    this.form.controls['completed']?.setValue(data.completed)
    this.form.controls['date_of_transaction']?.setValue(new Date(data.date_of_transaction))
    this.form.controls['description']?.setValue(data.description)
    
    if (data.recurrent){
      this.form.controls['recurrent']?.setValue(true)
    }
    if (data.installment){
      this.repetitionOn = true;
      this.form.controls['repeats']?.setValue(true);
      this.form.controls['repetitions']?.setValue(data.installment.repetitions)
      this.form.controls['frequency']?.setValue(data.installment.frequency)
    }
    this.form.controls['notes']?.setValue(data.notes)
    this.form.controls['ignore']?.setValue(data.ignore)
    this.form.controls['type']?.setValue(data.type)
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
    if(this.transactionId && this.bulkEditSelection.value){
      let param = `bulk_mode=${this.bulkEditSelection.value}`;
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

  onEditBulkSelectionChange(){
    this.form.controls['bulk_mode'].setValue(this.bulkEditSelection.value);
  }


  onSubmitForm(){
    console.log(this.form.value, this.form.valid)
    let formValidationResult = this.validateForm();
    if(formValidationResult){
      this.service.create(this.form.value).subscribe(
        (res)=>{
          this.querySvc.setDateToQuery(this.dateOfTransaction.getMonth()+1, this.dateOfTransaction.getFullYear());
          this.querySvc.setTransactionType(this.transactionType);
          this.router.navigate(['transacciones']);
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }
}

