import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeOverviewComponent } from './home-overview/home-overview.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { ConfirmExitPopupGuard } from '../shared/services/can-exit-guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeOverviewComponent,
      },
      {
        path: ':id',
        component: HomeDetailComponent,
        canDeactivate: [ ConfirmExitPopupGuard ]
      },
    ])],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
