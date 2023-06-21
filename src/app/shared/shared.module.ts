import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { SectionInfoComponent } from './components/section-info/section-info.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CardInfoComponent,
    SectionInfoComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ], 
  exports: [
    HeaderComponent,
    SectionInfoComponent,
  ]
})
export class SharedModule { }
