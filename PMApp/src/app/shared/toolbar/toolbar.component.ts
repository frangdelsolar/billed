import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  userIsAuth: boolean = false;

  constructor(
    private sidebarSvc: SidebarService,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.userIsAuth = this.authSvc.isAuth();
  }

  onMenuClick(){
    this.sidebarSvc.$display.next(true);
  }

  onLogout(){
    this.authSvc.logout();
  }

}
