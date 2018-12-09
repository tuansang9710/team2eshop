import { Injectable, ElementRef, Type } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable } from 'rxjs';
import { StateService } from './state.service';
import { BaseComponent } from '../../base/base.component';
import { ModalComponent } from '../../base/modal.component';

/**
 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
 * the "open" method!
 *
 * @export
 * @class ModalService
 */
@Injectable()
export class ModalService {
  /**
   * Creates an instance of ModalService.
   * @param {NgbModal} ngModal A service to open modal windows.
   * @memberof ModalService
   */
  constructor(private ngModal: NgbModal, private state: StateService) { }

  /**
   * Opens a new modal window with the specified content and using supplied options.
   * @example
   *  this.open(contentComponent, {title: 'Modal Title'}, {size: 'sm'}).subscribe(onClose, OnDismiss);
   * @param {(BaseModalComponent | ElementRef)} content a TemplateRef or a BaseModalComponent type of modal
   * @param {*} [data] Initial data when content is BaseModalComponent
   * @param {NgbModalOptions} [option] Represent options available when opening new modal windows.
   * @see https://ng-bootstrap.github.io/#/components/modal/api#NgbModalOptions
   * @returns {Observable<any>} A Observable to deliver data back to the opener when a modal is closed or dismissed.
   * @memberof ModalService
   */
  open<TComponent extends BaseComponent>(content: ElementRef | Type<TComponent>, data?: any, option?: NgbModalOptions): Observable<any> {
    if (!option) {
      option = {};
    }
    if (!option.beforeDismiss) {
      option.beforeDismiss = () => false;
    }
    const modalRef = this.ngModal.open(content, option);
    if (modalRef.componentInstance instanceof ModalComponent) {
      modalRef.componentInstance.entryData = data;
    }
    this.state.currentModal = modalRef;
    return from(modalRef.result);
  }
}
