import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  $display: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {

  }

  openSidebar(){
    this.$display.next(true);
  }

  closeSidebar(){
    this.$display.next(false);
  }
}
