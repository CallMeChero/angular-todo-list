import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const components = [
];

@NgModule({
  imports: [
    NgbModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  declarations: components,
  exports: components
})
export class LayoutsModule { }
