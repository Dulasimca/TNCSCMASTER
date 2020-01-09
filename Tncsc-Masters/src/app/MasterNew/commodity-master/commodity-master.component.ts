import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { MessageService } from 'primeng/api';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commodity-master',
  templateUrl: './commodity-master.component.html',
  styleUrls: ['./commodity-master.component.css']
})
export class CommodityMasterComponent implements OnInit {
  ItemMasterData: any;
  ItemMasterCols: any;
  FilteredArray: any = [];
  AllotmentGroupData: any = [];
  PristineData: any;
  ItemData: any;
  ItemCode: any;
  ItemName: any;
  ItemType: any;
  Active: any;
  DeleteFlag: any;
  ItemOptions: SelectItem[];
  AllotmentOptions: SelectItem[];
  MeasurementOptions: SelectItem[];
  Measurement: any;
  AllotmentGroup: any;
  Item: any;
  ITTax: any;
  GRName: any;
  SFlag: boolean;
  CBFlag: boolean;
  Unit: any;
  Allotmentgroup: any;
  ITBweighment: any;
  TRCode: any;
  RCode: any;
  GCode: any;
  canShowMenu: boolean;
  loading: boolean;
  searchText: any;
  isAdd: boolean = false;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  @ViewChild('measurement', { static: false }) measurementPanel: Dropdown;
  @ViewChild('allotment', { static: false }) allotmentPanel: Dropdown;
  @ViewChild('item', { static: false }) itemPanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
    this.loading = true;
    this.restAPIService.get(PathConstants.ITEM_MASTER).subscribe(res => {
      if (res !== undefined) {
        this.ItemMasterCols = this.tableConstants.CommodityMasterCols;
        this.ItemMasterData = res;
        this.FilteredArray = res;
        this.ItemMasterData.forEach(s => {
          if (s.ItemType === 'C') {
            return s.ItemName = 'Cereal';
          } else if (s.ItemType === 'NC') {
            return s.ItemName = 'Non-Cereal';
          }
        });
        let sno = 0;
        this.ItemMasterData.forEach(ss => {
          sno += 1;
          ss.SlNo = sno;
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

  onSelect(item, type) {
    let ItemSelection = [];
    let MeasurementSelection = [];
    let AllotmentSelection = [];
    let Cereal = [];
    Cereal = this.FilteredArray;
    switch (item) {
      case 'item':
        if (type === 'enter') {
          this.itemPanel.overlayVisible = true;
        }
        if (Cereal !== undefined && Cereal !== null && Cereal.length !== 0) {
          var uniqueArray = Array.from(new Set(Cereal.map((item: any) => item.ItemType)));
          for (var index in uniqueArray) {
            var code = uniqueArray[index];
            let i = Cereal.findIndex(cd => cd.ItemType === code);
            ItemSelection.push({ 'label': Cereal[i].ItemName, 'value': code });
          }
          this.ItemOptions = ItemSelection;
          this.ItemOptions.unshift({ label: '-select', value: null });
        } else {
          this.ItemOptions = ItemSelection;
        }
        break;
      case 'measurement':
        if (type === 'enter') {
          this.measurementPanel.overlayVisible = true;
        }
        MeasurementSelection.push({ 'label': '-select-', 'value': null, disabled: true }, { 'label': 'GRAMS', 'value': 'GRAMS' }, { 'label': 'KGS', 'value': 'KGS' }, { 'label': 'KILOLITRE', 'value': 'KILOLITRE' }, { 'label': 'LTRS', 'value': 'LTRS' }, { 'label': 'M.TONS', 'value': 'M.TONS' }, { 'label': 'NO.s', 'value': 'NO.s' }, { 'label': 'QUINTAL', 'value': 'QUINTAL' });
        this.MeasurementOptions = MeasurementSelection;
        break;
      case 'allotment':
        if (type === 'enter') {
          this.allotmentPanel.overlayVisible = true;
        }
        // if (this.AllotmentOptions === undefined) {
        this.restAPIService.get(PathConstants.ALLOTMENT_GROUP_MASTER).subscribe(res => {
          if (res !== undefined && res !== null && res.length !== 0) {
            this.AllotmentGroupData = res;
            this.AllotmentGroupData.forEach(S => {
              AllotmentSelection.push({ 'label': S.AllotmentGroup, 'value': S.AllotmentID });
            });
            this.AllotmentOptions = AllotmentSelection;
            this.AllotmentOptions.unshift({ 'label': '-select-', 'value': null, disabled: true });
          }
        });
      // }
    }
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.ItemCode = selectedRow.ITCode;
    this.ItemName = selectedRow.ITDescription;
    this.ItemOptions = [{ label: selectedRow.ItemName, value: selectedRow.ItemType }];
    this.MeasurementOptions = [{ label: selectedRow.ITBweighment, value: selectedRow.Measurement }];
    this.AllotmentOptions = [{ label: selectedRow.Allotmentgroup, value: selectedRow.AllotmentID }];
    this.ItemType = selectedRow.ItemType;
    this.TRCode = selectedRow.ItemName;
    this.Measurement = selectedRow.ITBweighment;
    this.Active = selectedRow.Activeflag;
    this.DeleteFlag = selectedRow.DeleteFlag;
    this.ITTax = selectedRow.ittax;
    this.GRName = selectedRow.GRName;
    this.SFlag = selectedRow.SFlag;
    this.CBFlag = selectedRow.CBFlag;
    this.Unit = selectedRow.Unit;
    this.AllotmentGroup = selectedRow.Allotmentgroup;
  }

  onAdd() {
    this.isAdd = true;
    this.ItemCode = this.ItemName = undefined;
    this.ItemOptions = this.AllotmentOptions = this.MeasurementOptions = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'ITCode': this.ItemCode || '',
      'ITDescription': this.ItemName,
      'ITBweighment': this.Measurement,
      'ittax': this.ITTax,
      'GRName': this.GRName,
      'ItemType': this.ItemType,
      'DeleteFlag': this.DeleteFlag || 'F',
      'ActiveFlag': this.Active,
      'Allotmentgroup': this.AllotmentGroup.label || '',
      'SFlag': this.SFlag || true,
      'CBFlag': this.CBFlag || true,
      'Unit': this.Unit || this.Measurement
    };
    this.restAPIService.post(PathConstants.COMMODITY_MASTER_POST, params).subscribe(res => {
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
    this.onClear();
  }

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.ITEM_MASTER).subscribe(res => {
      if (res !== undefined) {
        this.ItemMasterCols = this.tableConstants.CommodityMasterCols;
        this.ItemMasterData = res;
        this.FilteredArray = res;
        this.ItemMasterData.forEach(s => {
          if (s.ItemType === 'C') {
            return s.ItemName = 'Cereal';
          } else if (s.ItemType === 'NC') {
            return s.ItemName = 'Non-Cereal';
          }
        });
        let sno = 0;
        this.ItemMasterData.forEach(ss => {
          sno += 1;
          ss.SlNo = sno;
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

  onSearch(value) {
    this.ItemMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.ItemMasterData = this.FilteredArray.filter(item => {
        return item.ITDescription.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.ItemMasterData = this.FilteredArray;
    }
  }

  onClear() {
    this.ItemMasterData = this.ItemMasterCols = this.AllotmentOptions = this.MeasurementOptions = this.ItemOptions = undefined;
    this.ItemName = this.ItemCode = this.ITTax = this.Active = this.ItemType = this.Measurement = this.AllotmentGroup = null;
    this.isEdited = false;
  }
}
