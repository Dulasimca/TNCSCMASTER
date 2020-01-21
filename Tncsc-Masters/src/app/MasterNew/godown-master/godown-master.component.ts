import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-godown-master',
  templateUrl: './godown-master.component.html',
  styleUrls: ['./godown-master.component.css']
})
export class GodownMasterComponent implements OnInit {
  GodownMasterData: any;
  GodownMasterCols: any;
  GodownData: any;
  FilteredArray: any;
  GodownCode: any;
  GodownName: any;
  Region: any;
  Active: any;
  DeleteFlag: any;
  godownOptions: SelectItem[];
  operationalTypeOptions: SelectItem[];
  ownerTypeOptions: SelectItem[];
  Godown: any;
  RCode: any;
  GCode: any;
  canShowMenu: boolean;
  searchText: any;
  Capacity: any;
  Carpet: any;
  Shops: any;
  OperationalType: any;
  OperationalCode: any;
  OwnerCode: any;
  OwnerType: any;
  SessionFlag: boolean;
  ExportFlag: boolean;
  loading: boolean;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  @ViewChild('godown', { static: false }) godownPanel: Dropdown;
  @ViewChild('operationalType', { static: false }) operationalTypePanel: Dropdown;
  @ViewChild('ownerType', { static: false }) ownerTypePanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
  }

  onSelect(item, type) {
    let godownSelection = [];
    let operationalTypeSelection = [];
    let ownerTypeSelection = [];
    switch (item) {
      case 'godown':
        if (type === 'enter') {
          this.godownPanel.overlayVisible = true;
        }
        if (this.godownOptions === undefined) {
          this.restAPIService.get(PathConstants.GODOWN_DATA).subscribe(res => {
            if (res !== undefined) {
              this.GodownData = res;
              this.GodownData.forEach(data => {
                godownSelection.push({ 'label': data.Name, 'value': data.Code });
              });
              this.godownOptions = godownSelection;
            }
          });
        }
        break;
      case 'operationalType':
        if (type === 'enter') {
          this.operationalTypePanel.overlayVisible = true;
        }
        operationalTypeSelection.push({ 'label': '-select-', 'value': null, disabled: true }, { 'label': 'Operational Godown', 'value': 'O ' }, { 'label': 'Buffer Godown', 'value': 'B ' },
          { 'label': 'Gunny Godown', 'value': 'G ' }, { 'label': 'Cap', 'value': 'C ' });
        this.operationalTypeOptions = operationalTypeSelection;
        break;
      case 'ownerType':
        if (type === 'enter') {
          this.ownerTypePanel.overlayVisible = true;
        }
        ownerTypeSelection.push({ 'label': '-select-', 'value': null, disabled: true }, { 'label': 'OWNED', 'value': 'O' }, { 'label': 'HIRED', 'value': 'H' },
          { 'label': 'CWC', 'value': 'CW' }, { 'label': 'TNWC', 'value': 'TW' });
        this.ownerTypeOptions = ownerTypeSelection;
        break;
    }
  }

  onView() {
    this.loading = true;
    const params = {
      'RCode': this.Region,
      // 'GCode': this.GCode
    };
    this.restAPIService.getByParameters(PathConstants.GODOWN_MASTER_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.GodownMasterCols = this.tableConstants.GodownMaster;
        this.GodownMasterData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.GodownMasterData.forEach(s => {
          sno += 1;
          s.SlNo = sno;
        });
        this.loading = false;
      }
      else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: StatusMessage.NoRecForCombination
        });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
          summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ErrorMessage
        });
      }
    });
    this.onClear();
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.operationalTypeOptions = [{ label: selectedRow.OPERATIONTYPE, value: selectedRow.OPERATIONTYPE }];
    this.ownerTypeOptions = [{ label: selectedRow.TNCSType, value: selectedRow.TNCSType }];
    this.GodownCode = selectedRow.TNCSCode;
    this.GodownName = selectedRow.TNCSName;
    this.Godown = selectedRow.TNCSRegn;
    this.Capacity = selectedRow.TNCSCapacity;
    this.Carpet = selectedRow.TNCSCarpet;
    this.Shops = selectedRow.NOOFSHOPCRS;
    this.OperationalType = selectedRow.OPERATIONTYPE;
    this.OperationalCode = selectedRow.OperationalType;
    this.OwnerCode = selectedRow.OwnerType;
    this.OwnerType = selectedRow.TNCSType;
    this.SessionFlag = selectedRow.SessionFlag;
    this.ExportFlag = selectedRow.ExportFlag;
    this.Active = selectedRow.ActiveFlag;
    this.DeleteFlag = selectedRow.DeleteFlag;
  }

  onAdd() {
    this.isEdited = true;
    this.operationalTypeOptions = this.ownerTypeOptions = undefined;
    this.GodownCode = this.GodownName = this.Capacity = this.Carpet = this.Shops = this.SessionFlag = this.ExportFlag = this.DeleteFlag = this.OperationalType = this.OwnerType = null;
    this.Active = false;
  }

  onSave() {
    const params = {
      'TNCSCode': this.GodownCode || '',
      'TNCSName': this.GodownName,
      'TNCSRegn': this.Godown,
      'TNCSType': this.OwnerType,
      'TNCSCarpet': this.Carpet,
      'TNCSCapacity': this.Capacity,
      'SessionFlag': this.SessionFlag || '',
      'ExportFlag': this.ExportFlag || '',
      'OPERATIONTYPE': this.OperationalType,
      'NOOFSHOPCRS': this.Shops || '0',
      'DocStatus': (this.Active === 'A') ? true : false,
      'CBStatement': (this.Active === 'A') ? true : false,
      'DeleteFlag': this.DeleteFlag || 'F',
      'ActiveFlag': this.Active,
    };
    this.restAPIService.post(PathConstants.GODOWN_MASTER_POST, params).subscribe(res => {
      if (res) {
        this.onView();
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_SUCCESS,
          summary: StatusMessage.SUMMARY_SUCCESS, detail: StatusMessage.SuccessMessage
        });
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: StatusMessage.ValidCredentialsErrorMessage
        });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
          summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ErrorMessage
        });
      }
    });
  }


  onSearch(value) {
    this.GodownMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.GodownMasterData = this.FilteredArray.filter(item => {
        return item.TNCSName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.GodownMasterData = this.FilteredArray;
    }
  }
  onReset(item) {
    if (item === 'godown') {
      this.GodownMasterData = this.GodownMasterCols = undefined;
      this.onClear();
    }
    if (item === 'operational') {
      this.operationalTypeOptions = undefined;
      this.OperationalType = null;
    }
    if (item === 'owner') {
      this.ownerTypeOptions = undefined;
      this.OwnerType = null;
    }
  }

  onClear() {
    this.GodownMasterData = this.GodownMasterCols = this.operationalTypeOptions = this.ownerTypeOptions = undefined;
    this.GodownCode = this.GodownName = this.Capacity = this.Carpet = this.Shops = this.OperationalType = this.OwnerType = this.Active = null;
    this.isEdited = false;
  }
}