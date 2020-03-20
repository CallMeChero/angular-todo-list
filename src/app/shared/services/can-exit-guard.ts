import { Injectable, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeactivationGuarded } from './deactivation-guarded';
import { ModalConfirmExitComponent } from '../components/modal-confirm-exit/modal-confirm-exit.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmExitPopupGuard implements CanDeactivate<DeactivationGuarded> {

  constructor(private modalService: NgbModal) { }
  private confimationSubject = new Subject<boolean>();

  canDeactivate(component: DeactivationGuarded): Observable<boolean> | Promise<boolean> | boolean {
    if (component.isDirty()) {
      const popupRef = this.modalService.open(ModalConfirmExitComponent);
      popupRef.result.then(result => this.confimationSubject.next(result));
      return this.confimationSubject;
    } {
      return true;
    }
  }
}
