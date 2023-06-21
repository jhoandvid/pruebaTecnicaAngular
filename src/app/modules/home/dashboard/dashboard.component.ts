import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import { LocalStorageService } from '../../services/localStorage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  data: {leastAffected:any, mostAffected:any, mortalityRate:any}={
    leastAffected: undefined,
    mostAffected: undefined,
    mortalityRate: undefined
  }
/*   leastAffected:any=[];
  mostAffected:any=[]; */
  isLoadInputCVS=true;


  constructor(private readonly localStorageService:LocalStorageService){
  }
  ngOnInit(): void {
    const dataLocalStorage=this.localStorageService.getDataLocalStorage("reportCovid");
    this.isLoadInputCVS=true;
    if(dataLocalStorage && Object.keys(dataLocalStorage).length > 0){
      this.data.leastAffected=dataLocalStorage.leastAffected
      this.data.mostAffected=dataLocalStorage.mostAffected
      this.data.mortalityRate=dataLocalStorage.mortalityRate
      this.isLoadInputCVS=false;
    }
  }
  /* {"leastAffected":[{"state":"American Samoa","total":0},{"state":"Diamond Princess","total":0}],"mostAffected":[{"state":"California","total":61526}]} */

  public onFileChange(event: any) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsText(file);

      reader.onload = () => {
        let csvData = reader.result;
        let parsedData = Papa.parse(csvData as string).data;
        this.mostAndLeastAffectedStates(parsedData);
      };
    }
  }

  mostAndLeastAffectedStates(data:any) {
    const cities:any={};

    data.forEach((city:any)=>{
      if (!isNaN(city[city.length - 1])) {
        if (!cities[city[6]]) {
        cities[city[6]] = {
          state: city[6], 
          countDate: Number(city[city.length - 1])  ,
          totalPopulation: Number(city[11])
        }

      } else {
        cities[city[6]].state; 
        cities[city[6]].countDate +=Number(city[city.length - 1])
        cities[city[6]].totalPopulation+=Number(city[11])
      } 
    }
    });

  

    const sortedCities=Object.values(cities).map((res:any)=>({state:res.state, total:res.countDate, population:res.totalPopulation, mortalityRate: Math.round(res.totalPopulation/res.countDate)})).sort((a, b)=>a.total-b.total);
    const mortalityRate = Object.values(cities).map((res:any) => {
      let population = res.totalPopulation ? res.totalPopulation : 0;
      let countDate = res.countDate ? res.countDate : 0;
      let mortalityRate = (population && countDate) ? Math.round(population/countDate) : 0;
  
      return {
          state: res.state ? res.state : '',
          total: countDate,
          population: population,
          mortalityRate: mortalityRate
      };
  }).sort((a, b) => a.mortalityRate - b.mortalityRate);
    this.data.leastAffected = sortedCities.filter((city: any) => city.total === sortedCities[0].total);
    this.data.mostAffected = sortedCities.filter((city: any) => city.total === sortedCities[sortedCities.length - 1].total);
    console.log(mortalityRate);
    this.data.mortalityRate=[mortalityRate[sortedCities.length - 1]];
    console.log(this.data)
    this.localStorageService.setDataLocalStorage("reportCovid", this.data);
    this.isLoadInputCVS=false;
}

}
