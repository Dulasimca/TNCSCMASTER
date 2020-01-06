import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { PathConstants } from 'src/app/constants/path.constants';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-depositor-master',
  templateUrl: './depositor-master.component.html',
  styleUrls: ['./depositor-master.component.css']
})
export class DepositorMasterComponent implements OnInit {
  DepositorMasterData: any;
  DepositorMasterCols: any;
  DepositorData: any;
  depositorOptions: SelectItem[];
  Depositor: any;
  canShowMenu: boolean;
  loading: boolean;
  @ViewChild('depositor') depositorPanel: Dropdown;


  constructor(private authService: AuthService, private restAPIService: RestAPIService) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
  }

  // onSelect(item, type) {
  //   let depositorSelection = [];
  //   switch (item) {
  //     case 'depositor':
  //       if (type === 'enter') {
  //         this.depositorPanel.overlayVisible = true;
  //       }
  //       if (this.depositorOptions === undefined) {
  //         const params = {
  //           'TRCode': 'D'
  //         };
  //         this.restAPIService.getByParameters(PathConstants.DEPOSITOR_TYPE_MASTER, params).subscribe(res => {
  //           if (res !== undefined) {
  //             this.DepositorData = res;
  //             this.DepositorData.forEach(data => {
  //               depositorSelection.push({ 'label': data.Tyname, value: data.Tycode });
  //             });
  //             this.depositorOptions = depositorSelection;
  //           }
  //         });
  //       }
  //   }
  // }

  onView() {

  }
}