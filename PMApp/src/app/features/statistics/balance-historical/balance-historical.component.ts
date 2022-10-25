import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '@core/controllers/transaction-controller.service';

@Component({
  selector: 'app-balance-historical',
  templateUrl: './balance-historical.component.html',
  styleUrls: ['./balance-historical.component.scss']
})
export class BalanceHistoricalComponent implements OnInit {

  form!: FormGroup;
  dateRange = new FormControl([new Date(), new Date()], []);

  data: any;

  constructor(
    private fb: FormBuilder,
    private service: TransactionService
  ) { 



  }

  ngOnInit(): void {

    this.form = this.fb.group({
      dateRange: this.dateRange
    })
    let today = new Date();
    let dateCopy = new Date(today.getTime())
    dateCopy.setFullYear(dateCopy.getFullYear() - 1);
    this.dateRange.setValue([dateCopy, today]);
    this.retrieveData();
  }


  retrieveData(){
    let data={
      date_from:  new Date(),
      date_to: new Date()
    }
    if(this.dateRange.value){
        data={
          date_from:  this.dateRange.value[0],
          date_to: this.dateRange.value[1]
        } 
    }
    this.service.getHistorical(data).subscribe(
      (res)=>{
        this.data = {
          labels: res.labels,
          datasets: [
              {
                  label: 'Gastos',
                  data: res.expense,
                  fill: false,
                  borderColor: 'red',
                  tension: .4
              },
              {
                  label: 'Ingresos',
                  data: res.income,
                  fill: false,
                  borderColor: 'green',
                  tension: .4
              },
              {
                  label: 'Total',
                  data: res.total,
                  fill: false,
                  borderColor: 'blue',
                  tension: .4
              }
          ]    
        }
      }
    )
  }

  onSubmit(){
    this.retrieveData();
  }

}
