import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { IDatatableHeader } from '../models/datatable-header';
import { ITodo } from '../models/todo';
import { HEADER_ITEMS } from '../models/mock-data/datatable-mock-data';
import { HomeService } from '../services/home.service';
import {untilComponentDestroyed, componentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-home-overview',
  templateUrl: './home-overview.component.html',
  styleUrls: ['./home-overview.component.scss']
})
export class HomeOverviewComponent  implements OnInit, OnDestroy {

  isLoading: boolean = true;
  columns: IDatatableHeader[] = [];
  todos: ITodo[] = [];

  ColumnMode: typeof ColumnMode = ColumnMode;
  SortType: typeof SortType = SortType;

  constructor(
    private homeService: HomeService
  ) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.columns = HEADER_ITEMS;
    this.getTodos();
  }

  getTodos() {
    this.homeService.getTodos().pipe(untilComponentDestroyed(this)).subscribe(
      responseData => {
        this.isLoading = false;
        this.todos = responseData;
      }
    )
  }

  navigateToDetails(id) {}

}
