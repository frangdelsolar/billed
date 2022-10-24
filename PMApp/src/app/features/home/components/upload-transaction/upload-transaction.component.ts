import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TransactionCSVService } from '@core/controllers/transaction-csv-controller.service';

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
    private service: TransactionCSVService
  ) { 
    this.form = fb.group({
      file: this.file,
    })
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file.setValue(event.files[0]);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('file')?.value);
    this.service.post(formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

}
