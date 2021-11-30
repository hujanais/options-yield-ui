import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OptionData } from '../models/option-data';
import { TickerMetaData } from '../models/ticker-meta';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private serverUrl: string = environment.serverUrl;
  constructor(private http: HttpClient) {}

  getMeta(ticker: string): Observable<HttpResponse<TickerMetaData>> {
    return this.http.get<TickerMetaData>(
      `${this.serverUrl}/api/meta?ticker=${ticker}`,
      {
        observe: 'response',
      }
    );
  }

  getPutOptions(
    ticker: string,
    expiry: string
  ): Observable<HttpResponse<OptionData[]>> {
    return this.http.get<OptionData[]>(
      `${this.serverUrl}/api/put-options?ticker=${ticker}&expiry=${expiry}`,
      {
        observe: 'response',
      }
    );
  }
}
