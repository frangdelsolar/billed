import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionCSVService } from '@core/controllers/transaction-csv-controller.service';
import { SidebarService } from '@core/services/sidebar.service';
import { DownloadTransactionComponent } from '@features/home/components/download-transaction/download-transaction.component';
import { UploadTransactionComponent } from '@features/home/components/upload-transaction/upload-transaction.component';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  display = true;

  items = [
      {
        label: 'Navegar',
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-home',
            routerLink: '/'
          }
        ]
      },
      {
        label: 'Transacciones',
        items: [
            {
              label: 'Importar datos', 
              icon: 'pi pi-cloud-upload',  
              command: (event:any) => {
                this.onUploadClick();
              }
            },
            {
              label: 'Exportar datos', 
              icon: 'pi pi-cloud-download',  
              command: (event:any) => {
                this.onDownloadClick();
              }
            }
        ],
      },
      {
        label: 'Configuración',
        items:[
            {
              label: 'Administrar categorías',
              icon: 'pi pi-th-large',
              routerLink: '/categorias'
            },
            {
              label: 'Administrar etiquetas',
              icon: 'pi pi-tags',
              routerLink: '/etiquetas'
            }
          ]
      }
    ]
  
  constructor(
    private sidebarSvc: SidebarService,
    public dialogService: DialogService, 
    private router: Router,
    private messageService: MessageService,
    private service: TransactionCSVService

  ) { }

  ngOnInit(): void {
    this.sidebarSvc.$display.subscribe(res=>this.display = res)
  }

  onShow(){
    this.sidebarSvc.$display.next(true);
  }

  onHide(){
    this.sidebarSvc.$display.next(false);
  }

  onUploadClick(){
    const ref = this.dialogService.open(UploadTransactionComponent, {
      header: 'Importar transacciones',
      width: '40%',
      height: '40%',
      draggable: true,
      resizable: true,
      contentStyle: {'overflow': 'visible'},
    });
    ref.onClose.subscribe((res: any) => {
        
    });
  }

  onDownloadClick(){
    const ref = this.dialogService.open(DownloadTransactionComponent, {
      header: 'Exportar transacciones',
      width: '40%',
      height: '30%',
      draggable: true,
      resizable: true,
      contentStyle: {'overflow': 'visible'},
    });
    ref.onClose.subscribe((res: any) => {
        
    });
  }
}
