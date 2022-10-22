import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '@core/controllers/category-controller.service';
import { Category } from '@core/models/category.interface';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-move-category',
  templateUrl: './move-category.component.html',
  styleUrls: ['./move-category.component.scss']
})
export class MoveCategoryComponent implements OnInit {
  
  markAllAsDirty = markAllAsDirty;

  @Input() in_category?: Category;

  form!: FormGroup;

  formFrom: FormControl = new FormControl({value: null, disabled: true}, [Validators.required]);
  formTo: FormControl = new FormControl(null, [Validators.required]);
  transactionType='';


  constructor(
    private fb: FormBuilder, 
    private messageService: MessageService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private confirmationService: ConfirmationService,
    private service: CategoryService,
    private router: Router,
  ) {
    this.form = fb.group({
      from: this.formFrom,
      to: this.formTo,
    });
    
    this.in_category = this.config.data.category;
    this.transactionType = this.config.data.category.category_type
    this.formFrom.setValue(this.config.data.category.id);
   }

  ngOnInit(): void {
  }

  onSubmitForm(){
    if (this.form.valid){
      this.confirmationService.confirm({
        message: '¿Quieres cambiar las transacciones de categoría?',
        accept: () => {
          if(this.in_category){
            this.service.move(this.in_category.id, this.form.getRawValue()).subscribe(
              (res)=>{
                this.messageService.add({severity:'success', summary:'Operación exitosa', detail:`Las transacciones han cambiado de categoría`});
                this.router.navigate(['categorías']);
                this.ref.close()
              },
              (err)=>{
                this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error.message});
                this.ref.close()
              }
            )
          }
        }
      });  
      } else {
        this.markAllAsDirty(this.form);
      }
    }
  }
