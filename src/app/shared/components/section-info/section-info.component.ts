import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-info',
  templateUrl: './section-info.component.html',
  styleUrls: ['./section-info.component.scss']
})
export class SectionInfoComponent {
    @Input() data:any;

    constructor(){
      console.log(this.data);
    }
}
