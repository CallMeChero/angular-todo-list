import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from 'src/app/shared/utilis/ngb-date-custom-parser-formatter';
import { CustomDatepickerI18n } from 'src/app/shared/utilis/custom-date-picker-i18n';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ITodo } from '../models/todo';
import { HomeService } from '../services/home.service';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-aoe-task',
  templateUrl: './modal-aoe-task.component.html',
  styleUrls: ['./modal-aoe-task.component.scss'],
  providers: [
    // croatian datepicker
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
  ]
})
export class ModalAoeTaskComponent implements OnInit {

  taskGroup: FormGroup;

  @Input() row: ITodo;

  constructor(
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    public homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.taskGroup = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required], //
      name: ['', Validators.required],
      isCompleted: [false],
      description: ['', Validators.required],
      dateCreated: ['', Validators.required]
    });

    //edit case
    if(this.row) {
      this.taskGroup.patchValue({
        id: this.row.id,
        title: this.row.title,
        name: this.row.name,
        isCompleted: this.row.isCompleted,
        description: this.row.description,
        dateCreated: {
          year: moment(this.row.dateCreated, 'DD.MM.YYYY').year(),
          month: moment(this.row.dateCreated, 'DD.MM.YYYY').month() + 1,
          day: moment(this.row.dateCreated, 'DD.MM.YYYY').date()
        }
      })
    }
  }

  onSubmit() {
    //if triggered, results in displaying invalid-feedback in html
    if(this.taskGroup.invalid) {
      return;
    } 
    
    if(this.row) {
      this.homeService.updateTodo(this.taskGroup).pipe(take(1)).subscribe(
        data => {
          this.modal.close(true)
        }
        // error is resolved by HttpErrorInterceptor
      )
    } else {
      this.homeService.addTodo(this.taskGroup).pipe(take(1)).subscribe(
        data => {
          this.modal.close(true)
        }
        // error is resolved by HttpErrorInterceptor
      )
    }
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
