import { Component, OnInit } from '@angular/core';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private sidebarSvc: SidebarService
  ) { }

  ngOnInit(): void {
  }

  onMenuClick(){
    this.sidebarSvc.$display.next(true);
  }

}
