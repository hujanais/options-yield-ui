import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { OptionData } from 'src/app/models/option-data';

@Component({
  selector: 'app-options-graph',
  templateUrl: './options-graph.component.html',
  styleUrls: ['./options-graph.component.scss'],
})
export class OptionsGraphComponent implements OnInit {
  private _optionsData: OptionData[] = [];

  @ViewChild(BaseChartDirective, { static: true }) chart?: BaseChartDirective;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        backgroundColor: 'red',
        radius: 5,
      },
    },
    scales: {
      xAxes: [
        {
          position: 'bottom',
          gridLines: {
            color: '#9E9E9E',
          },
          ticks: {
            fontColor: '#DEDEDE',
          },
          scaleLabel: {
            display: true,
            labelString: 'Strike Offset(%)',
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
            labelString: 'premium(%)',
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
      data: [1.2, 2.4, 3.5, 2.4, 11.0],
      label: 'yield',
    },
  ];
  public lineChartLabels: Label[] = ['10', '20', '30', '40', '50'];

  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';

  constructor() {}

  @Input() set optionsData(data: OptionData[]) {
    this._optionsData.length = 0;
    this._optionsData = [...data];

    const len = this._optionsData.length;
    this.lineChartData[0].data = new Array<number>(len);
    this.lineChartLabels = new Array<string>(len);

    for (let i = 0; i < len; i++) {
      this.lineChartLabels[i] = data[i].Offset.toString();
      this.lineChartData[0].data[i] = data[i].Percentage;
    }

    this.chart?.update();
  }

  get optionsData() {
    return this._optionsData;
  }

  ngOnInit(): void {}
}
