import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { LocalStorageService } from '../../../modules/services/localStorage.service';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.scss'],
})
export class DonaComponent {
  cities = [];

  constructor(private localStorage: LocalStorageService) {}

  getData(): any {
    const data = this.localStorage.getDataLocalStorage('cities');
    if (!data) {
      return [];
    }

    return data;
  }

  ngOnInit() {
    window.addEventListener('storage', () => {
      window.location.reload();
    });
    this.updateChartData();
  }

  updateChartData() {
    const data = this.getData();
    const parsedData = data.length > 0 ? data : {};
    const doughnutChartLabels = Object.keys(parsedData).map(
      (key) => parsedData[key].state || ''
    );
    const population = Object.keys(parsedData).map(
      (key) => parsedData[key].population || 0
    );
    const Deaths = Object.keys(parsedData).map(
      (key) => parsedData[key].total || 0
    );

    this.doughnutChartLabels = doughnutChartLabels;
    this.population = population;
    this.totalDeaths = Deaths;

    const totalPopulation = population.reduce((acc, curr) => acc + curr, 0);
    const totalDeaths = Deaths.reduce((acc, curr) => acc + curr, 0);
    const totalDeathPercentage = Deaths.map((total) => {
      return (total / totalDeaths) * 100;
    });

    this.doughnutChartData = {
      labels: doughnutChartLabels,
      datasets: [
        { label: 'Total de población por estado', data: population }, // población
        {
          label: 'Porcentaje de muertes por estado',
          data: totalDeathPercentage,
        }, // casos
      ],
    };

    console.log('Total Population:', totalPopulation);
    console.log(
      'Total Death Percentage:',
      totalDeathPercentage.reduce((acc, curr) => acc + curr, 0)
    );
  }

  public doughnutChartLabels: any[] = [];
  public population: any[] = [];
  public totalDeaths: any[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      { data: [] }, // población
      { data: [] }, // casos
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
}
