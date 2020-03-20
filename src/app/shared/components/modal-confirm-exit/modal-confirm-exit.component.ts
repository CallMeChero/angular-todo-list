import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-exit',
  templateUrl: './modal-confirm-exit.component.html',
  styleUrls: ['./modal-confirm-exit.component.scss']
})
export class ModalConfirmExitComponent implements OnInit {

  @Output() passEntry: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
