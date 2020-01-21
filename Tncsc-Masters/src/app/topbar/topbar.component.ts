import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
@Output() menuClick = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  onMenuClick() {
    this.menuClick.emit(true);
  }

}
