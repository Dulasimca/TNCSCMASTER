import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showSideBar: boolean;
  showDownArrow_SM: boolean = false;
  showDownArrow_FP: boolean = false;
  showDownArrow_OM: boolean = false;
  showDownArrow_CM: boolean = false;
  showDownArrow_MD: boolean = false;
  showDownArrow_SCU: boolean = false;
  constructor() { }

  ngOnInit() {


  }

  toggleButton(type) {
    switch (type) {
      case 'fp':
        this.showDownArrow_FP = !this.showDownArrow_FP;
        break;
      case 'sc':
        this.showDownArrow_SM = !this.showDownArrow_SM;
        break;
      case 'cm':
        this.showDownArrow_CM = !this.showDownArrow_CM;
        break;
      case 'ot':
        this.showDownArrow_OM = !this.showDownArrow_OM;
        break;
      case 'md':
        this.showDownArrow_MD = !this.showDownArrow_MD;
        break;
      case 'scu':
        this.showDownArrow_SCU = !this.showDownArrow_SCU;
        break;
    }
  }

  onClickMenuBar(event) {
    this.showSideBar = event;
  }

}

