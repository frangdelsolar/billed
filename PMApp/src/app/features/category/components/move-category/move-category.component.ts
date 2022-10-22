import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-move-category',
  templateUrl: './move-category.component.html',
  styleUrls: ['./move-category.component.scss']
})
export class MoveCategoryComponent implements OnInit {
  
  markAllAsDirty = markAllAsDirty;

  @Input() in_transactionType ='expense';

  form!: FormGroup;

  formFrom: FormControl = new FormControl({value: null, disabled: true}, [Validators.required]);
  formTo: FormControl = new FormControl(null, [Validators.required]);

  selectionFrom = 229;

  constructor(
    private fb: FormBuilder, 
    private messageService: MessageService,

  ) {
    this.form = fb.group({
      formFrom: this.formFrom,
      formTo: this.formTo,
    });
   }

  ngOnInit(): void {
    this.formFrom.setValue(this.selectionFrom);
  }

  onSubmitForm(){
    // this.formFrom.enable()
    console.log(this.form.getRawValue())
    if (this.form.valid){
      // if(this.transactionId){
      //   let param = `bulk_mode=${this.bulk_mode.value}`;
      //   this.service.update(this.transactionId, this.form.value, param).subscribe(
      //     (res)=>{
      //       this.setup();
      //       let date = this.date_of_transaction.value;
      //       if (date){
      //         this.querySvc.setDateToQuery(date.getMonth()+1, date.getFullYear());
      //       }
      //       this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Se ha/n editado la/s transacción/es'});
      //       this.querySvc.setTransactionType(this.transactionType);
      //       this.router.navigate(['transacciones']);
      //     },
      //     (err)=>{
      //       this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
      //     }
      //   )
      } else {
        this.markAllAsDirty(this.form);
      }
    }
  }
