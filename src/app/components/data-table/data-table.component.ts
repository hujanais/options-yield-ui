import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OptionData } from 'src/app/models/option-data';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  private _optionsData: OptionData[] = [];
  displayedColumns: string[] = [
    'strike',
    'offset',
    'yield',
    'lastprice',
    'volume',
    'openinterest',
  ];
  public dataSource: MatTableDataSource<OptionData> =
    new MatTableDataSource<OptionData>();

  @Input() sortDirection: 1 | -1 = 1;

  @Input() set optionsData(data: OptionData[]) {
    this._optionsData.length = 0;
    this._optionsData = [...data];
    this.dataSource.data = [...data].sort(
      (a, b) => (b.Strike - a.Strike) * this.sortDirection
    );
  }

  get optionsData() {
    return this._optionsData;
  }

  constructor() {}

  ngOnInit(): void {}
}
