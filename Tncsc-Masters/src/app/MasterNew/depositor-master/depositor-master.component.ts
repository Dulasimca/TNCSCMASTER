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
  selector: 'app-depositor-master',
  templateUrl: './depositor-master.component.html',
  styleUrls: ['./depositor-master.component.css']
})
export class DepositorMasterComponent implements OnInit {
  DepositorMasterData: any;
  DepositorMasterCols: any;
  DepositorData: any;
  FilteredArray: any;
  DepositorCode: any;
  DepositorName: any;
  Active: any;
  DeleteFlag: any;
  depositorOptions: SelectItem[];
  Depositor: any;
  RCode: any;
  GCode: any;
  canShowMenu: boolean;
  searchText: any;
  loading: boolean;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  @ViewChild('depositor', { static: false }) depositorPanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
  }

  onSelect(item, type) {
    let depositorSelection = [];
    switch (item) {
      case 'depositor':
        if (type === 'enter') {
          this.depositorPanel.overlayVisible = true;
        }
        if (this.depositorOptions === undefined) {
          const params = {
            'TRCode': 'D'
          };
          this.restAPIService.getByParameters(PathConstants.DEPOSITOR_TYPE_MASTER, params).subscribe(res => {
            if (res !== undefined) {
              this.DepositorData = res;
              this.DepositorData.forEach(data => {
                depositorSelection.push({ 'label': data.Tyname, 'value': data.Tycode });
              });
              this.depositorOptions = depositorSelection;
            }
          });
        }
    }
  }

  onView() {
    this.loading = true;
    const params = {
      'DepositorType': this.Depositor
    };
    this.restAPIService.getByParameters(PathConstants.DEPOSITOR_MASTER_TYPE_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.DepositorMasterCols = this.tableConstants.DepositorMasterType;
        this.DepositorMasterData = res;
        this.FilteredArray = res;
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
    this.DepositorCode = selectedRow.DepositorCode;
    this.DepositorName = selectedRow.DepositorName;
    this.Active = selectedRow.ActiveFlag;
    this.DeleteFlag = selectedRow.DeleteFlag;
  }

  onSave() {
    const params = {
      'RCode': this.RCode,
      'GCode': this.GCode,
      'DepositorCode': this.DepositorCode,
      'DepositorName': this.DepositorName,
      'DepositorType': this.Depositor,
      'DeleteFlag': this.DeleteFlag,
      'ActiveFlag': this.Active,
    };
    this.restAPIService.post(PathConstants.DEPODITOR_MASTER_TYPE_POST, params).subscribe(res => {
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
    this.DepositorMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.DepositorMasterData = this.FilteredArray.filter(item => {
        return item.DepositorName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.DepositorMasterData = this.FilteredArray;
    }
  }
  onReset(item) {
    if (item === 'depositor') {
      this.onClear();
    }
  }

  onClear() {
    this.DepositorMasterData = this.DepositorMasterCols = undefined;
    this.DepositorCode = this.DepositorName = this.Active = null;
    this.isEdited = false;
  }
}