import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]

})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
