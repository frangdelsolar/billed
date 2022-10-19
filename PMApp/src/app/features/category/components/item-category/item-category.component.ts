import { Component, Input, OnInit } from '@angular/core';
import { Category } from '@core/models/category.interface';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {

  @Input() category?: Category;
  items: MenuItem[];

  constructor() {
    this.items = [
      {label: 'Editar', icon: 'pi pi-fw pi-pencil'},
      {label: 'Archivar', icon: 'pi pi-fw pi-download'},
      {label: 'Mover Transacciones', icon: 'pi pi-fw pi-file-export'}
  ];
   }

  ngOnInit(): void {

  }

}
