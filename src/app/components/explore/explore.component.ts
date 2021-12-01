import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { OptionData } from 'src/app/models/option-data';
import { TickerMetaData } from 'src/app/models/ticker-meta';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  private _selectedExpiry: string | undefined;

  serverUrl = environment.serverUrl;
  title = 'options-yield-ui';
  ticker = new FormControl('');
  daysToExpiry: string = '--';

  metaData: TickerMetaData = {
    ticker: 'NaN',
    price: -1.0,
    expirationDates: [],
  };

  optionsData: OptionData[] = [];

  debugMessage: any = 'hello';

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  public get selectedExpiry(): string | undefined {
    return this._selectedExpiry;
  }

  public set selectedExpiry(val: string | undefined) {
    this._selectedExpiry = val;
    this.daysToExpiry = moment(val, 'MM-DD-YYYY').fromNow();
    this.getPuts();
  }

  getPuts(): void {
    if (!this.selectedExpiry) return;
    this.api.getPutOptions(this.ticker.value, this.selectedExpiry).subscribe({
      next: (v: HttpResponse<OptionData[]>) => {
        if (v.body) {
          this.debugMessage = 'getPuts-ok';
          this.optionsData = v.body;
        }
      },
      error: (e: HttpErrorResponse) => {
        this.debugMessage = {
          status: e.status,
          error: e.error,
        };
      },
    });
  }

  onGetMeta(): void {
    this.api.getMeta(this.ticker.value).subscribe({
      next: (v: HttpResponse<TickerMetaData>) => {
        if (v.body) {
          this.debugMessage = 'ok';
          this.metaData = v.body;
        }
      },
      error: (e: HttpErrorResponse) => {
        this.debugMessage = {
          status: e.status,
          error: e.error,
        };
      },
    });
  }
}
