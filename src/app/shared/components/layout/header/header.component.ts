import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router
  ) { }

  //tryouts with feather packet before goin to font awesome
  ngAfterViewInit() {
    Feather.replace();
  }

  ngOnInit() {
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

}
