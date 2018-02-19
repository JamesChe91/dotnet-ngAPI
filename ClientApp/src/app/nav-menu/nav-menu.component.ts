import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;

  items: MenuItem[];

  val1: string;

  val2: string = 'Option 2';

  ngOnInit() {
    this.items = [
      {
        label: 'Ng Prueba Api',
        items:
          [
            // { label: 'Home', icon: 'fa-home' },
            { label: 'Counter', icon: 'fa-graduation-cap', routerLink: ["/counter"] },
            { label: 'Fetch data', icon: 'fa-list-alt', routerLink: ["/fetch-data"] },
            { label: 'Empleados', icon: 'fa-list', routerLink: ["/fetch-emp"] },

          ]
      }
      // ,
      // {
      //   label: 'Edit',
      //   items: [
      //     { label: 'Undo', icon: 'fa-refresh' },
      //     { label: 'Redo', icon: 'fa-repeat' }
      //   ]
      // }
    ];
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
