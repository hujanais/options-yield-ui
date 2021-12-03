import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { PriceData } from 'src/app/models/price-data';

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.scss'],
})
export class PriceGraphComponent implements OnInit {
  private _priceData: PriceData[] = [];

  @ViewChild(BaseChartDirective, { static: true }) chart?: BaseChartDirective;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'month',
          },
          position: 'bottom',
          gridLines: {
            color: '#9E9E9E',
          },
          ticks: {
            fontColor: '#DEDEDE',
          },
          scaleLabel: {
            display: true,
            labelString: 'Date',
            fontColor: '#DEDEDE',
            fontSize: 16,
          },
        },
      ],
      yAxes: [
        {
          position: 'left',
          gridLines: {
            color: '#9E9E9E',
          },
          ticks: {
            fontColor: '#DEDEDE',
          },
          scaleLabel: {
            display: true,
            labelString: 'Price',
            fontColor: '#DEDEDE',
            fontSize: 16,
          },
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: '#1565C0',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
  ];

  public lineChartData: ChartDataSets[] = [
    {
      label: 'First dataset',
      data: [
        {
          x: new Date(2020, 1, 1),
          y: 1,
        },
        {
          t: new Date(2020, 4, 1),
          y: 3,
        },
        {
          t: new Date(2020, 7, 1),
          y: 5,
        },
        {
          t: new Date(2020, 10, 1),
          y: 7,
        },
      ],
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';

  constructor() {}

  ngOnInit(): void {}

  @Input() set priceData(data: PriceData[]) {
    this._priceData.length = 0;
    this._priceData = [...data];
    const len = this._priceData.length;
    this.lineChartData[0].data = new Array<any>(len);
    for (let i = 0; i < len; i++) {
      this.lineChartData[0].data[i] = {
        x: new Date(data[i].date * 1e3),
        y: data[i].adjclose,
      };
    }
    this.chart?.update();
  }

  get priceData() {
    return this._priceData;
  }
}
