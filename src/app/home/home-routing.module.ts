import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeOverviewComponent } from './home-overview/home-overview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeOverviewComponent,
     },
    ])],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
