import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from '@core/controllers/tag-controller.service';
import { Tag } from '@core/models/tag.interface';
import { reloadCurrentRoute } from '@core/utils/reloadCurrentRoute';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-tag',
  templateUrl: './list-tag.component.html',
  styleUrls: ['./list-tag.component.scss']
})
export class ListTagComponent implements OnInit {

  reloadCurrentRoute = reloadCurrentRoute;

  tags?: Tag[];
  tagFormControl = new FormControl('', [Validators.required]);

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: TagService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,

    ) {
      this.form = fb.group({
        name:this.tagFormControl
      })
     }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (res)=>{
        this.tags = res;
      },
      (err)=>{
        this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
      }
    )
  }

  isUniqueTag(){
    let tag_name = this.tagFormControl.value;
    let clones = this.tags?.filter((tag)=>tag.name==tag_name);
    if (clones && clones.length > 0){
      return false;
    }
    return true;
  }

  onAddTag(){
    if (!this.isUniqueTag()){
      this.tagFormControl.markAsDirty();
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Parece que ya existe una etiqueta similar.'});
      return;
    }
    if (this.tagFormControl.valid){
      this.service.create(this.form.value).subscribe(
        (res)=>{
          this.tags?.push(res)
          this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Se ha registrado la etiqueta'});
          this.form.reset();
        },
        (err)=>{
          this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
        }
      )
    } else {
      this.tagFormControl.markAsDirty();
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Parece que falta completar algo.'});
    }
  }

  onRemoveTag(tag: any){
    this.confirmationService.confirm({
      message: '¿Quieres eliminar esta etiqueta?',
      accept: () => {
          this.service.delete(tag).subscribe(
            (res)=>{
              this.messageService.add({severity:'success', summary:'Operación exitosa', detail:`Etiqueta eliminada`});
            },
            (err)=>{
              this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
              this.reloadCurrentRoute(this.router)
            }
          )
        },
        reject:()=>{
          this.reloadCurrentRoute(this.router)
        }
      })

  }

}
