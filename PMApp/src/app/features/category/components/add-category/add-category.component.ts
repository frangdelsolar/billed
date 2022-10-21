import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '@core/controllers/category-controller.service';
import { Category } from '@core/models/category.interface';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  markAllAsDirty = markAllAsDirty;

  @Input() in_category?: Category;

  form!: FormGroup;
  name = new FormControl('', [Validators.required]);
  color = new FormControl('#4858e8', [Validators.required]);
  icon = new FormControl('pi-image', [Validators.required]);
  category_type = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder, 
    private messageService: MessageService,
    private service: CategoryService,
    private router: Router,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig

  ) { 
    this.form = fb.group({
      name: this.name,
      color: this.color,
      icon: this.icon,
      category_type: this.category_type
    })
  }

  ngOnInit(): void {

    if (this.config.data.category){
      this.in_category = this.config.data.category;
      this.name.setValue(this.config.data.category.name);
      this.color.setValue(this.config.data.category.color);
      this.icon.setValue(this.config.data.category.icon);
      this.category_type.setValue(this.config.data.category.category_type);
    } else {
      this.category_type.setValue(this.config.data.category_type);
    }

  }

  onSubmit(){
    console.log(this.form.value)
    if (this.form.valid){
      this.service.create(this.form.value).subscribe(
        (res)=>{
          this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Categoría añadida'});
          this.router.navigate(['categorias/']);
          this.ref.close()
        },
        (err)=>{
          this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
        }
      )
    } else {
      this.markAllAsDirty(this.form);
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Parece que falta completar algo.'});
    }
  }

  onUpdate(){
    if (this.form.valid){
      if (this.in_category){
        this.service.update(this.in_category?.id, this.form.value).subscribe(
          (res)=>{
            this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Categoría actualizada'});
            this.router.navigate(['categorias/']);
            this.ref.close()
          },
          (err)=>{
            this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error.message});
          }
        )      
      }
 
    } else {
      this.markAllAsDirty(this.form);
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Parece que falta completar algo.'});
    }
  }

  onDelete(){
    if(this.in_category){
      this.service.delete(this.in_category.id).subscribe(
        (res)=>{
          this.messageService.add({severity:'success', summary:'Operación exitosa', detail:`Categoría eliminada`});
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
}
