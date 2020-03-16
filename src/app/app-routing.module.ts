import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: LayoutComponent,
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      // NOT DEFINED
      // { 
      //   path:'**', 
      //   component: LayoutComponent,
      //   children: [
      //     {
      //       path: '404',
      //       component: PageNotFoundComponent
      //     }
      //   ]
      // }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
