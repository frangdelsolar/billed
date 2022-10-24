import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionCSVService } from '@core/controllers/transaction-csv-controller.service';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-download-transaction',
  templateUrl: './download-transaction.component.html',
  styleUrls: ['./download-transaction.component.scss']
})
export class DownloadTransactionComponent implements OnInit {
  
  markAllAsDirty = markAllAsDirty;

  form!: FormGroup;
  dateRange: FormControl = new FormControl('', [Validators.required]);
  transactionType='';

  link = ''

  constructor(
    private fb: FormBuilder, 
    private messageService: MessageService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private service: TransactionCSVService,
  ) {
    this.form = fb.group({
      dateRange: this.dateRange
    });
    
   }

  ngOnInit(): void {
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  formatDate(date: Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  onSubmit(){
    if (this.form.valid){
      let from = this.formatDate(this.dateRange.value[0]);
      let to = this.formatDate(this.dateRange.value[1]);
      let params = `?from=${from}&to=${to}`;
        this.service.download(params).subscribe(
          (res: any)=>{
            let url= window.URL.createObjectURL(res)
            window.open(url);
            this.ref.close()
          },
          (err: any)=>{
            this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error.message});
            this.ref.close()
          }
        )
      } else {
        this.markAllAsDirty(this.form);
      }
    }
}
