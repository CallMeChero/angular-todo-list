import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmExitComponent } from './confirm-exit/confirm-exit.component';
import { NgSelectModule } from '@ng-select/ng-select';

const modals =  [
    ConfirmExitComponent
];;

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: modals,
  exports: modals
})
export class SharedModalsModule { }