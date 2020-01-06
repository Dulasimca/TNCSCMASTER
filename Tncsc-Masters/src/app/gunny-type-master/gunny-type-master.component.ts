import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-gunny-type-master',
  templateUrl: './gunny-type-master.component.html',
  styleUrls: ['./gunny-type-master.component.css']
})
export class GunnyTypeMasterComponent implements OnInit {
  gunnyCols: any;
  gunnyData: any = [];
  activeOptions: SelectItem[];
  GunnyName: string;
  GunnyCode: string;
  Flag: string;
  label: string;
  isSelected: boolean;
  loading: boolean;

  constructor() { }

  ngOnInit() {
    this.activeOptions = [{ label: 'Active', value: 'A'}, { label: 'InActive', value: 'I' }];
    this.label = 'Save';
  }

  onRowSelect(data, index) {
    this.isSelected = true;
    this.label = 'Update';
   }

  onSave() { }
}
