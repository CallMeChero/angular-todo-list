import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeOverviewComponent } from './home-overview/home-overview.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedDirectivesModule } from '../shared/directives/shared-directives.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [
    HomeOverviewComponent, 
    HomeDetailComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule
  ],
  exports: [ HomeRoutingModule ]
})
export class HomeModule { }
