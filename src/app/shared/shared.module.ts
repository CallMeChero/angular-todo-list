import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './components/components.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    RouterModule,
    NgbModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedDirectivesModule
  ],
  declarations: [],
  exports: []
  
})
export class SharedModule { }
