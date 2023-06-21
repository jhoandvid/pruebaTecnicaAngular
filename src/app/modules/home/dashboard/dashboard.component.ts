import { Component } from '@angular/core';
import * as Papa from 'papaparse';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public onFileChange(event: any) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsText(file);

      reader.onload = () => {
        let csvData = reader.result;
        let parsedData = Papa.parse(csvData as string).data;

        console.log(parsedData);
      };
    }
  }


}
