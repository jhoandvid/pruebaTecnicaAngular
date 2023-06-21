import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import { LocalStorageService } from '../../services/localStorage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  leastAffected:any=[];
  mostAffected:any=[];
  isLoadInputCVS=false;

  constructor(private readonly localStorageService:LocalStorageService){
  }
  ngOnInit(): void {
    const dataLocalStorage=this.localStorageService.getDataLocalStorage("reportCovid");
    console.log(dataLocalStorage);
    if(dataLocalStorage){
      this.isLoadInputCVS=true;
      this.mostAndLeastAffectedStates(dataLocalStorage);
    }
  }

  public onFileChange(event: any) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsText(file);

      reader.onload = () => {
        let csvData = reader.result;
        let parsedData = Papa.parse(csvData as string).data;
        this.localStorageService.setDataLocalStorage("reportCovid", parsedData);
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
          countDate: Number(city[city.length - 1])  
        }
      } else {
        cities[city[6]].state; 
        cities[city[6]].countDate +=Number(city[city.length - 1])
      } 
    }
    });

    const sortedCities=Object.values(cities).map((res:any)=>({state:res.state, total:res.countDate})).sort((a, b)=>a.total-b.total);
    this. leastAffected = sortedCities.filter((city: any) => city.total === sortedCities[0].total);
    this. mostAffected = sortedCities.filter((city: any) => city.total === sortedCities[sortedCities.length - 1].total);


}

}
