import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reloadCurrentRoute } from '@core/utils/reloadCurrentRoute';
import { DialogService } from 'primeng/dynamicdialog';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
 
  reloadCurrentRoute = reloadCurrentRoute; 

  constructor(
    public dialogService: DialogService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onAddClick(type: String){
    const ref = this.dialogService.open(AddCategoryComponent, {
      header: 'Añadir Categoría',
      width: '40%',
      height: '60%',
      data: {
        category_type: type
      },
    });
    ref.onClose.subscribe((res: any) => {
        this.reloadCurrentRoute(this.router);
    });
  }
}
