import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeOverviewComponent } from './home-overview/home-overview.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeOverviewComponent, 
    HomeDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ HomeRoutingModule ]
})
export class HomeModule { }
