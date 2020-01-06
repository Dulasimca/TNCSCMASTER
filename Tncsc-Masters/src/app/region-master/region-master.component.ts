import { Component, OnInit } from '@angular/core';
import { TableConstants } from '../constants/table.constants';

@Component({
  selector: 'app-region-master',
  templateUrl: './region-master.component.html',
  styleUrls: ['./region-master.component.css']
})
export class RegionMasterComponent implements OnInit {
  regionCols: any;
  regionData: any;
  loading: boolean;
  RName: string;
  RCode: string;

  constructor() { }

  ngOnInit() {
    this.regionCols = TableConstants.RegionMasterCols;
  }

  onView() { }

  onRowSelect(data, index) { }

}
