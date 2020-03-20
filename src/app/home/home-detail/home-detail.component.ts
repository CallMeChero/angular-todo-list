import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { ITodo } from '../models/todo';
import { HomeService } from '../services/home.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from 'src/app/shared/utilis/ngb-date-custom-parser-formatter';
import { CustomDatepickerI18n } from 'src/app/shared/utilis/custom-date-picker-i18n';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { slideInAnimation } from 'src/app/shared/animations/slider-animation';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DeactivationGuarded } from 'src/app/shared/services/deactivation-guarded';
@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss'],
  animations: [slideInAnimation],
  providers: [
    // croatian datepicker
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
  ]
})
export class HomeDetailComponent implements OnInit, OnDestroy, DeactivationGuarded {

  id: number;
  todo: ITodo;
  isEditMode: boolean = false;
  taskGroup: FormGroup;
  isSubmited = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.taskGroup = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required], //
      name: ['', Validators.required],
      isCompleted: [false],
      description: ['', Validators.required],
      dateCreated: ['', Validators.required]
    });

    if(this.id) {
      this.getById(this.id);
    }
  }

  // got to have it, even empty - due to untilComponentDestroyed
  ngOnDestroy() {   }

  getById(todoId): void {
    this.homeService.getTodo(todoId).pipe(untilComponentDestroyed(this)).subscribe(
      data => {
        this.todo = data;
      }
    )
  }

  editTask(): void {
    this.isEditMode = true;
    this.taskGroup.patchValue({
      id: this.todo.id,
      title: this.todo.title,
      name: this.todo.name,
      isCompleted: this.todo.isCompleted,
      description: this.todo.description,
      dateCreated: {
        year: moment(this.todo.dateCreated).year(),
        month: moment(this.todo.dateCreated).month() + 1,
        day: moment(this.todo.dateCreated).date()
      }
    })
  }

  closeEdit(): void {
    this.isEditMode = false;
    this.taskGroup.reset();
  }


  onSubmit(): void {
    if(this.taskGroup.invalid) {
      return;
    }
    
    this.homeService.updateTodo(this.taskGroup).pipe(take(1)).subscribe(
      data => {
        this.isEditMode = false;
        this.taskGroup.reset();
        this.getById(this.id);
        this.toastrService.success('Uredili ste zadatak', 'Uspjeh');
        this.isSubmited = true;
      }
      // error is resolved by HttpErrorInterceptor
    )
  }

  isDirty(): boolean {
    return this.isSubmited ? false : this.taskGroup.dirty;
  }

  get title(): AbstractControl {
    return this.taskGroup.get('title');
  }
  get name(): AbstractControl {
    return this.taskGroup.get('name');
  }
  get description(): AbstractControl {
    return this.taskGroup.get('description');
  }
  get dateCreated(): AbstractControl {
    return this.taskGroup.get('dateCreated');
  }
}
