import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@core/models/category.interface';
import { reloadCurrentRoute } from '@core/utils/reloadCurrentRoute';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';

import { AddCategoryComponent } from '../add-category/add-category.component';
import { MoveCategoryComponent } from '../move-category/move-category.component';
import { CategoryService } from '@core/controllers/category-controller.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {

  reloadCurrentRoute = reloadCurrentRoute; 

  @Input() category!: Category;
  items: MenuItem[];

  constructor(
      public dialogService: DialogService, 
      private router: Router,
      private confirmationService: ConfirmationService,
      private service: CategoryService,
      private messageService: MessageService,
    ) {
      this.items = [
        {
          label: 'Editar', 
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            this.onEditClick();
          }
        },
        {
          label: 'Mover Transacciones', 
          icon: 'pi pi-fw pi-file-export',
          command: () => {
            this.onMoveTransactionsClick();
          }
        }
      ];



   }

  ngOnInit(): void {
    if (this.category?.archived == false){
      this.items.push({
        label: 'Archivar', 
        icon: 'pi pi-fw pi-download',
        command: () => {
          this.onArchiveClick(true, '¿Quieres archivar esta categoría?');
        }
      })
    } else {
      this.items.push({
        label: 'Activar', 
        icon: 'pi pi-fw pi-upload',
        command: () => {
          this.onArchiveClick(false, '¿Quieres activar esta categoría?');
        }
      })
    }

  }


  onEditClick(){
    const ref = this.dialogService.open(AddCategoryComponent, {
      header: 'Añadir Categoría',
      width: '40%',
      height: '60%',
      contentStyle: {'overflow': 'visible'},
      data: {
        category: this.category
      },
    });
    ref.onClose.subscribe((res: any) => {
        this.reloadCurrentRoute(this.router);
    });
  }

  onArchiveClick(value:boolean, prompt: string){
    let data = {
      archived: value
    }
    this.confirmationService.confirm({
        message: prompt,
        accept: () => {
          if(this.category){
            this.service.update(this.category.id, data).subscribe(
              (res)=>{
                this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Categoría actualizada'});
                this.reloadCurrentRoute(this.router);
              },
              (err)=>{
                this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error.message});
              }
            )  
          }
        }
    });  
  }

  onMoveTransactionsClick(){
    const ref = this.dialogService.open(MoveCategoryComponent, {
      header: 'Mover transacciones',
      width: '40%',
      height:'70%',
      contentStyle: {'overflow': 'visible'},
      data: {
        category: this.category 
    },
    });
    ref.onClose.subscribe((res: any) => {
      this.router.navigate(['/categorias/']);
    });
  }
}
