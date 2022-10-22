import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryService } from '@core/controllers/category-controller.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit {

  @Input() in_transactionType: string= "";
  @Input() in_formControl: FormControl = new FormControl("", []);
  @Input() in_dropValue?: number;

  categories?: any = [];

  constructor(
    private messageService: MessageService,
    private service: CategoryService
    ) { 
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.getData();
    }, 100)

  }
  
  getData(){
    this.service.getByType(this.in_transactionType).subscribe(
      (res)=>{
        this.categories = res;
        this.dropValueInCategories();
      },
      (err)=>{
        this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
      }
      )
  }

  dropValueInCategories(){
    if (this.in_dropValue){
      this.categories = this.categories.filter((cat:any)=>cat.id!=this.in_dropValue)
    }
  }

}
