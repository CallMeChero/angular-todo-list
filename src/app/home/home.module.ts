import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeOverviewComponent } from './home-overview/home-overview.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedDirectivesModule } from '../shared/directives/shared-directives.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalAoeTaskComponent } from './modal-aoe-task/modal-aoe-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeOverviewComponent, 
    HomeDetailComponent, 
    ModalAoeTaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbModule
  ],
  exports: [ HomeRoutingModule ],
  entryComponents: [
    ModalAoeTaskComponent
  ]
})
export class HomeModule { }
