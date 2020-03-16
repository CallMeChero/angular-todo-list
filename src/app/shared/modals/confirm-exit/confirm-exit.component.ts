import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hlcr-confirm-exit',
  templateUrl: './confirm-exit.component.html',
  styleUrls: ['./confirm-exit.component.scss']
})
export class ConfirmExitComponent implements OnInit {

  @Output() passEntry: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  passBack(value: boolean) {
    this.activeModal.close(value);
  }

}