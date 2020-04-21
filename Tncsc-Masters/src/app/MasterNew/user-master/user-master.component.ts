import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/primeng';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {
  UserMasterData: any;
  UserMasterCols: any;
  UserName: any;
  Password: any;
  Email: any;
  Emp: any;
  Phone: any;
  RoleMappingOptions: SelectItem[];
  RoleMapping: any;
  enableRegion: boolean = false;
  enableGodown: boolean = false;
  RCode: any;
  GCode: any;
  GodownData: any;
  FilteredArray: any;
  GodownCode: any;
  GodownName: any;
  Active: any;
  godownOptions: SelectItem[];
  canShowMenu: boolean;
  searchText: any;
  loading: boolean;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  @ViewChild('godown', { static: false }) godownPanel: Dropdown;
  @ViewChild('role', { static: false }) rolePanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService,
    private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
  }

  onSelect(item, type) {
    let roleSelection = [];
    switch (item) {
      case 'RoleMapping':
        if (type === 'enter') {
          this.rolePanel.overlayVisible = true;
        }
        if (this.RoleMappingOptions === undefined) {
          this.restAPIService.get(PathConstants.ROLE_MAPPING).subscribe(res => {
            if (res !== undefined) {
              this.RoleMapping = res;
              this.RoleMapping.forEach(data => {
                roleSelection.push({ label: data.MappingName, value: data.MappingId });
              });
              this.RoleMappingOptions = roleSelection;
              if (this.RoleMapping.RoleId === 1 && this.RoleMapping.RoleId === 8 && this.RoleMapping.RoleId === 9
                && this.RoleMapping.RoleId === 10 && this.RoleMapping.RoleId === 11) {
                this.enableRegion = false;
                this.enableGodown = false;
              } else if (this.RoleMapping.RoleId === 2 && this.RoleMapping.RoleId === 4 && this.RoleMapping.RoleId === 5) {
                this.enableRegion = true;
                this.enableGodown = false;
              } else if (this.RoleMapping.RoleId === 3 && this.RoleMapping.RoleId === 6 && this.RoleMapping.RoleId === 7) {
                this.enableRegion = true;
                this.enableGodown = true;
              }
            }
          });
        }
        break;
    }
  }

  onView() {
    this.loading = true;
    const params = {
      'UserName': this.UserName,
    };
    this.restAPIService.getByParameters(PathConstants.USER_MASTER_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.UserMasterCols = this.tableConstants.UserMaster;
        this.UserMasterData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.UserMasterData.forEach(s => {
          sno += 1;
          s.SlNo = sno;
        });
        this.loading = false;
      } else {
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
    this.RoleMappingOptions = [{ label: selectedRow.MappingName, value: selectedRow.MappingId }];
    this.RoleMapping = selectedRow.MappingId;
    this.UserName = selectedRow.UserName;
    this.Password = selectedRow.Pwd;
    this.Email = selectedRow.TNCSCapacity;
    this.Emp = selectedRow.TNCSCarpet;
    this.Phone = selectedRow.NOOFSHOPCRS;
    this.RCode = selectedRow.OPERATIONTYPE;
    this.GCode = selectedRow.OperationalType;
    this.Active = selectedRow.Flag;
  }

  onAdd() {
    this.isEdited = true;
    this.isViewed = false;
    this.RoleMappingOptions = this.RoleMapping = undefined;
    this.UserName = this.Password = this.Email = this.Emp = this.Phone = this.RCode = this.GCode = null;
    this.Active = false;
  }

  onSave() {
    const params = {
      'UserName': this.UserName,
      'Pwd': this.Password,
      'EMailId': this.Email || '',
      'EmpId': this.Emp || '',
      'PhoneNumber': this.Phone || '',
      'RoleId': this.RoleMapping,
      'Flag': this.Active,
      'GodownCode': this.GCode || '',
      'Regioncode': this.RCode || '',
    };
    this.restAPIService.post(PathConstants.USER_MASTER_POST, params).subscribe(res => {
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
    this.UserMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.UserMasterData = this.FilteredArray.filter(item => {
        return item.UserName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.UserMasterData = this.FilteredArray;
    }
  }
  onReset(item) {
    if (item === 'user') {
      this.UserMasterData = this.UserMasterCols = undefined;
    } else if (item === 'role') {
      this.enableRegion = this.enableGodown = this.GCode = this.RCode = undefined;
    }
  }

  onClear() {
    this.UserName = this.Password = this.Email = this.Emp = this.Phone = this.RCode = this.GCode = null;
    this.UserMasterData = this.UserMasterCols = this.RoleMappingOptions = this.RoleMapping = undefined;
    this.isEdited = this.Active = false;
  }
}