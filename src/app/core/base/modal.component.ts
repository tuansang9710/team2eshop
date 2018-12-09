import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { BaseComponent } from './base.component';

/**
 * Component include input data, action of modal
 *
 * @export
 * @class ModalComponent
 */
export class ModalComponent extends BaseComponent {
  // Get data from modal to screen
  @Input() entryData;

  /**
   * Creates an instance of ModalComponent.
   * @param {NgbActiveModal} modalContentService
   * @memberof ModalComponent
   */
  constructor(public modalContentService: NgbActiveModal) {
    super();
  }

  /**
   * dismiss action
   *
   * @param {any} result
   * @memberof ModalComponent
   */
  dismiss(result?: any) {
    if (result !== undefined) {
      this.modalContentService.dismiss(result);
    } else {
      this.modalContentService.dismiss('dismiss');
    }
  }

  /**
   * close action
   *
   * @param {any} result
   * @memberof ModalComponent
   */
  close(result?: any) {
    if (result !== undefined) {
      this.modalContentService.close(result);
    } else {
      this.modalContentService.close('close');
    }
  }

  /**
   * cancel action
   *
   * @param {any} result
   * @memberof ModalComponent
   */
  cancel(result?: any) {
    if (result !== undefined) {
      this.modalContentService.close(result);
    } else {
      this.modalContentService.close('cancel');
    }
  }
}
