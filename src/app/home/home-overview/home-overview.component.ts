import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ColumnMode, SortType, SelectionType } from '@swimlane/ngx-datatable';
import { IDatatableHeader } from '../models/datatable-header';
import { ITodo } from '../models/todo';
import { HEADER_ITEMS } from '../models/mock-data/datatable-mock-data';
import { HomeService } from '../services/home.service';
import { untilComponentDestroyed, componentDestroyed } from "@w11k/ngx-componentdestroyed";
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalAoeTaskComponent } from '../modal-aoe-task/modal-aoe-task.component';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home-overview',
  templateUrl: './home-overview.component.html',
  styleUrls: ['./home-overview.component.scss']
})
export class HomeOverviewComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  columns: IDatatableHeader[] = [];
  todos: ITodo[] = [];
  staticValues: ITodo[] = [];
  searchValue: string = '';
  selected: ITodo[] = [];
  
  ColumnMode: typeof ColumnMode = ColumnMode;
  SortType: typeof SortType = SortType;
  SelectionType: typeof SelectionType = SelectionType;

  constructor(
    private homeService: HomeService,
    private ngbModalService: NgbModal,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  // got to have it, even empty - due to untilComponentDestroyed
  ngOnDestroy() { }

  ngOnInit() {
    this.columns = HEADER_ITEMS;
    this.getTodos();
  }

  getTodos(): void {
    this.homeService.getTodos().pipe(untilComponentDestroyed(this)).subscribe(
      responseData => {
        this.todos = []; //ngx-datatable change detection
        this.isLoading = false;
        this.todos = [...responseData];
        this.staticValues = responseData;
      }
    )
  }

  // ngx datatable ngClass
  getRowClass(row: ITodo) {
    return {
      'col-danger': !row.isCompleted,
      'col-success': row.isCompleted
    };
  }

  displayCheck(row): boolean {
    return row.isCompleted === false;
  }

  filterDatatable(): boolean | void {
    let searchVal = this.searchValue.toLowerCase();
    let colsAmt = 10;
    let keys = Object.keys(this.staticValues[0]);

    this.todos = this.staticValues.filter(function(item){
      for (let i=0; i<colsAmt; i++){
        if (item[keys[i]] != null && item[keys[i]].toString().toLowerCase().indexOf(searchVal) !== -1 || !searchVal){
          return true;
        }
      }
    });
  }

  removeSearchValue(): void {
    this.searchValue = '';
    this.todos = this.staticValues;
  }

  addOrEditTask(row?:ITodo): void {
    const modalRef = this.ngbModalService.open(ModalAoeTaskComponent, { size: 'lg', backdrop: 'static' });
    if (row) {
      modalRef.componentInstance.row = row;
    }
    modalRef.result.then((result) => {
      if (result) {
        if (row) {
          this.toastrService.success('Uredili ste zadatak', 'Uspjeh');
          this.getTodos();
        } else {
          this.toastrService.success('Dodali ste zadatak', 'Uspjeh');
          this.getTodos();
        }
      } else {
        this.toastrService.warning('Niste dodali/uredili zadatak', 'Pažnja');
      }
    }).catch((res) => { });
  }

  navigateToDetails(id): void {
    this.router.navigate(['home', id]);
  }

  finishTasks(): void {
    if(this.selected && this.selected.length) {
      const tasks = this.selected.filter(x => x.isCompleted === false);
      //fork join
      this.homeService.updateTasks(tasks).pipe(untilComponentDestroyed(this)).subscribe(
        results => {
          //put request, by the default(inmemory-web-api packet) returns null
          if(typeof results[tasks.length-1] !== 'undefined'){
            this.toastrService.success('Završili ste zadatke', 'Uspjeh');
            this.getTodos();
          }
      })
    }
  }

  deleteTask(row: ITodo): void {
    const modalRef = this.ngbModalService.open(ModalConfirmationComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = 'Brisanje stavke';
    modalRef.componentInstance.description = `Jeste li sigurni da želite izbrisati zadatak: ${row.name}`
    modalRef.result.then((result) => {
      if (result) {
        this.homeService.deleteHero(row.id).pipe(take(1)).subscribe(
          data => {
            this.getTodos();
            this.toastrService.warning('Obrisali ste zadatak', 'Uspjeh');
          }
        )
      } else {
        this.toastrService.warning('Niste izbrisali zadatak', 'Pažnja');
      }
    }).catch((res) => { });
  }

}
