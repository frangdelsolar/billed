import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TransactionCSVService } from '@core/controllers/transaction-csv-controller.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-upload-transaction',
  templateUrl: './upload-transaction.component.html',
  styleUrls: ['./upload-transaction.component.scss']
})
export class UploadTransactionComponent implements OnInit {

  form!: FormGroup;
  file = new FormControl('',[]);

  constructor(
    private fb: FormBuilder,
    private service: TransactionCSVService,
    private messageService: MessageService,
    public ref: DynamicDialogRef, 
  ) { 
    this.form = fb.group({
      file: this.file,
    })
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file.setValue(event.files[0]);
    this.messageService.add({severity:'info', summary:'Operación exitosa', detail:'Estamos procesando el archivo.'});
    this.onSubmit();
    this.ref.close()
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('file')?.value);
    this.service.post(formData).subscribe(
      (res) => {
        this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Los datos han sido procesados correctamente.'});
      },
      (err) => {  
        this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
      }
    );
  }

}
