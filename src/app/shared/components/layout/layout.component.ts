import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { slideInAnimation } from '../../animations/slider-animation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [slideInAnimation]
})
export class LayoutComponent implements OnInit {

  moduleLoading: boolean;  
  constructor(
    private router: Router
  ) {
    router.events.subscribe( routerEvent =>{
      this.checkRouterEvent(routerEvent);
    });
   }

  ngOnInit() {
    
  }

  checkRouterEvent(routerEvent) {
    if(routerEvent instanceof NavigationStart) {
      this.moduleLoading = true;
    }

    if(routerEvent instanceof NavigationEnd || 
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
        this.moduleLoading = false;
      }
  }

}
