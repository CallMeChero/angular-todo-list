import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenWindowDirective } from './full-screen.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FullScreenWindowDirective],
  exports: [FullScreenWindowDirective]
})
export class SharedDirectivesModule { }