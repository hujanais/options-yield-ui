import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
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
    historicalPrices: [],
  };

  optionsData: OptionData[] = [];

  debugMessage: any = undefined;

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

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

    let sbRef = this.snackBar.open('Retrieving ExpiryDates...', undefined, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
    });

    this.api.getPutOptions(this.ticker.value, this.selectedExpiry).subscribe({
      next: (v: HttpResponse<OptionData[]>) => {
        if (v.body) {
          this.optionsData = v.body;
          sbRef.dismiss();
        }
      },
      error: (e: HttpErrorResponse) => {
        sbRef.dismiss();
        this.debugMessage = {
          status: e.status,
          error: e.error,
        };
      },
    });
  }

  onGetMeta(): void {
    // clear the screen.
    this.metaData = {
      ticker: '----',
      price: -1.0,
      expirationDates: [],
      historicalPrices: [],
    };
    this.debugMessage = undefined;

    let sbRef = this.snackBar.open('Retrieving Data...', undefined, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
    });

    this.api.getMeta(this.ticker.value).subscribe({
      next: (v: HttpResponse<TickerMetaData>) => {
        sbRef.dismiss();
        if (v.body) {
          this.metaData = v.body;
        }
      },
      error: (e: HttpErrorResponse) => {
        sbRef.dismiss();
        this.debugMessage = {
          status: e.status,
          error: e.error,
        };
      },
    });
  }
}
