import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { SectionInfoComponent } from './components/section-info/section-info.component';
import { DonaComponent } from './components/dona/dona.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    HeaderComponent,
    CardInfoComponent,
    SectionInfoComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgChartsModule
  ], 
  exports: [
    HeaderComponent,
    SectionInfoComponent,
    DonaComponent
  ]
})
export class SharedModule { }
