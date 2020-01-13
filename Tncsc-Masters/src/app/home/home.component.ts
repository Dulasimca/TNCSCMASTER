import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RestAPIService } from '../services/restAPI.service';
import { DatePipe, LocationStrategy } from '@angular/common';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PathConstants } from '../constants/path.constants';
import { MessageService } from 'primeng/api';
import { StatusMessage } from '../constants/Messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cbRice: string = 'line';
  cbDhall: string = 'column';
  date: any;
  canShowMenu: boolean;
  notifications: any;
  errMessage: string;
  godownCount: any;
  mrmCount: any;
  aadsCount: any;
  fciCount: any;
  regionCount: any;
  shopsCount: any;
  hullingAgencies: any;
  suppliersCount: any;
  schemeCount: any;
  options: any;
  CBRiceData: any;
  CBDhallAndOilData: any;
  CBWheatAndSugarData: any;
  ReceiptRiceData: any;
  ReceiptDhallAndOilData: any;
  ReceiptWheatAndSugarData: any;
  IssueRiceData: any;
  IssueDhallAndOilData: any;
  IssueWheatAndSugarData: any;
  chartLabels: any[];
  rawRiceCB: any;
  boiledRiceCB: any;
  dhallCB: any;
  pOilCB: any;
  wheatCB: any;
  sugarCB: any;
  rawRicePB: number = 0;
  boiledRicePB: number = 0;
  dhallPB: number = 0;
  pOilPB: number = 0;
  wheatPB: number = 0;
  sugarPB: number = 0;
  selectedCBRiceType: string;
  receiptQuantity: any;
  issueQuantity: any;
  isCBClicked: boolean = true;
  isReceiptClicked: boolean = false;
  isIssueClicked: boolean = false;
  display: boolean = false;
  notificationsHeight: any;
  noti: any;
  NotificationsData: any;
  TNCSCKey: string = 'Notification';
  imgUrl = "../../assets/NotificationPopup/";
  imgPost = "";
  NotificationNotes: any;
  @ViewChild('AADS', { static: false }) divAADS: ElementRef;
  @ViewChild('element', { static: false }) toastObj;


  constructor(private authService: AuthService, private restApiService: RestAPIService, private datePipe: DatePipe,
    private router: Router, private locationStrategy: LocationStrategy, private messageService: MessageService) { }

  ngOnInit() {
    this.showDialog();
    this.preventBackButton();
    // this.calculateHeight();  
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.date = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    let params = new HttpParams().set('Date', this.date);
    this.restApiService.get(PathConstants.DASHBOARD).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.godownCount = (res[0] !== undefined && res[0] !== '') ? res[0] : 0;
        this.mrmCount = (res[1] !== undefined && res[1] !== '') ? res[1] : 0;
        this.aadsCount = (res[2] !== undefined && res[2] !== '') ? res[2] : 0;
        this.fciCount = (res[3] !== undefined && res[3] !== '') ? res[3] : 0;
        this.regionCount = (res[4] !== undefined && res[4] !== '') ? res[4] : 0;
        this.shopsCount = (res[5] !== undefined && res[5] !== '') ? res[5] : 0;
        this.hullingAgencies = (res[6] !== undefined && res[6] !== '') ? res[6] : 0;
        this.suppliersCount = (res[7] !== undefined && res[7] !== '') ? res[7] : 0;
        this.schemeCount = (res[8] !== undefined && res[8] !== '') ? res[8] : 0;
        this.notifications = (res[9] !== undefined && res[9] !== '') ? res[9] : 0;
      } else {
        this.messageService.clear();
        this.messageService.add({ key: 't-err', severity: StatusMessage.SEVERITY_WARNING, summary: StatusMessage.SUMMARY_WARNING, detail: StatusMessage.DashboardNoRecord });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({ key: 't-err', severity: StatusMessage.SEVERITY_ERROR, summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ErrorMessage });
      }
    });
  }

  onGridClicked(param) {
    switch (param) {
      case 'godown':
        this.router.navigate(['godownData']);
        break;
      case 'mrm':
        this.router.navigate(['mrmData']);
        break;
      case 'shops':
        this.router.navigate(['crsData']);
        break;
      case 'aads':
        this.router.navigate(['aadsData']);
        break;
      case 'fci':
        this.router.navigate(['fciData']);
        break;
      case 'regions':
        this.router.navigate(['regions']);
        break;
      case 'hullingAgencies':
        this.router.navigate(['hullingAgencies']);
        break;
      case 'depositors':
        this.router.navigate(['depositors']);
        break;
      case 'schemes':
        this.router.navigate(['schemes']);
        break;
      case 'PB':
        if (this.isCBClicked) {
          this.router.navigate(['cbStatement']);
        } else if (this.isReceiptClicked) {
          // this.router.navigate(['']);
        } else {
          // this.router.navigate(['']);
        }
    }

  }

  calculateQuantity(id) {
    switch (id) {
      case 'CB':
        this.isCBClicked = true;
        this.isReceiptClicked = this.isIssueClicked = false;
        this.rawRicePB = this.rawRiceCB;
        this.boiledRicePB = this.boiledRiceCB;
        this.dhallPB = this.dhallCB;
        this.wheatPB = this.wheatCB;
        this.pOilPB = this.pOilCB;
        this.sugarPB = this.sugarCB;
        break;
      case 'R':
        this.isReceiptClicked = true;
        this.isCBClicked = this.isIssueClicked = false;
        this.boiledRicePB = this.rawRicePB = this.dhallPB = this.wheatPB = this.pOilPB = this.sugarPB = 0;
        this.receiptQuantity[2].forEach(bc => {
          this.boiledRicePB += (bc * 1);
        })
        this.receiptQuantity[3].forEach(bg => {
          this.boiledRicePB += (bg * 1);
        })
        this.receiptQuantity[4].forEach(rc => {
          this.rawRicePB += (rc * 1);
        })
        this.receiptQuantity[5].forEach(rg => {
          this.rawRicePB += (rg * 1);
        })
        this.receiptQuantity[6].forEach(d => {
          this.dhallPB += (d * 1);
        })
        this.receiptQuantity[7].forEach(po => {
          this.pOilPB += (po * 1);
        })
        this.receiptQuantity[8].forEach(pp => {
          this.pOilPB += (pp * 1);
        })
        this.receiptQuantity[9].forEach(w => {
          this.wheatPB += (w * 1);
        })
        this.receiptQuantity[10].forEach(s => {
          this.sugarPB += (s * 1);
        })
        break;
      case 'I':
        this.isIssueClicked = true;
        this.isCBClicked = this.isReceiptClicked = false;
        this.boiledRicePB = this.rawRicePB = this.dhallPB = this.wheatPB = this.pOilPB = this.sugarPB = 0;
        this.issueQuantity[2].forEach(bc => {
          this.boiledRicePB += (bc * 1);
        })
        this.issueQuantity[3].forEach(bg => {
          this.boiledRicePB += (bg * 1);
        })
        this.issueQuantity[4].forEach(rc => {
          this.rawRicePB += (rc * 1);
        })
        this.issueQuantity[5].forEach(rg => {
          this.rawRicePB += (rg * 1);
        })
        this.issueQuantity[6].forEach(d => {
          this.dhallPB += (d * 1);
        })
        this.issueQuantity[7].forEach(po => {
          this.pOilPB += (po * 1);
        })
        this.issueQuantity[8].forEach(pp => {
          this.pOilPB += (pp * 1);
        })
        this.issueQuantity[9].forEach(w => {
          this.wheatPB += (w * 1);
        })
        this.issueQuantity[10].forEach(s => {
          this.sugarPB += (s * 1);
        })
        break;
    }
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

  calculateHeight() {
    const height = this.divAADS.nativeElement.offsetHeight;
    this.notificationsHeight = (height * 4);
  }

  showDialog() {
    const param = { 'Type': 1 };
    this.restApiService.getByParameters(PathConstants.NOTIFICATIONS, param).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.NotificationsData = res[0];
        this.NotificationNotes = this.NotificationsData.Notes;
        this.imgPost = this.imgUrl + this.NotificationsData.ImageName;
      }
    });
    const params = { 'sValue': this.TNCSCKey };
    this.restApiService.getByParameters(PathConstants.TNCSC_SETTINGS, params).subscribe(res => {
      if (res !== undefined) {
        this.noti = res[0];
        if (this.noti.TNCSCValue === 'NO') {
          this.display = false;
        }
        if (this.noti.TNCSCValue === 'YES') {
          this.display = true;
        }
      }
    });
  }
}
