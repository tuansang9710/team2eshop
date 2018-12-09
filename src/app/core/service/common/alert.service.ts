import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { from } from 'rxjs';

export enum AlertType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
  question = 'question',
  position = 'top-end'
}

/**
 * Display a simple SweetAlert modal
 * @see https://sweetalert2.github.io/
 * @export
 * @class AlertService
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  /**
   * show success alert
   *
   * @param {string} description
   * @param {string} [title='Success']
   * @memberof AlertService
   */
  success(description: string, title: string = 'Success') {
    return from(swal(title, description, 'success'));
  }

  /**
   * show error alert
   *
   * @param {string} description
   * @param {string} [title='Error']
   * @memberof AlertService
   */
  error(description: string, title: string = 'Error') {
    return from(swal(title, description, 'error'));
  }

  /**
   * show warning alert
   *
   * @param {string} description
   * @param {string} [title='Warning']
   * @memberof AlertService
   */
  warning(description: string, title: string = 'Warning') {
    return from(swal(title, description, 'warning'));
  }

  addTocart(description: string, title: string = 'Success', position: string = '') {
    return from(swal(title, description, 'success'));
  }

  /**
   * show warning alert
   *
   * @param {string} description
   * @param {string} [title='Warning']
   * @memberof AlertService
   */
  warningWithCancel(description: string, title: string = 'Warning') {
    const option = {
      title: title,
      text: description,
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: false
    } as SweetAlertOptions;

    return from(swal(option));
  }

  /**
   * Show multi warning message as a queue
   *
   * @param {SweetAlertOptions[]} warnings
   * @returns
   * @memberof AlertService
   */
  warningQueue(warnings: SweetAlertOptions[]) {
    warnings.forEach(item => {
      if (!item.title) {
        item.title = 'Warning';
      }
      item.type = 'warning';
      item.allowOutsideClick = false;
    });

    return from(swal.queue(warnings));
  }

  /**
   * show info alert
   *
   * @param {string} description
   * @param {string} [title='info']
   * @memberof AlertService
   */
  info(description: string, title: string = 'Info') {
    return from(swal(title, description, 'info'));
  }

  /**
   * show question alert
   *
   * @param {string} description
   * @param {string} [title='Question']
   * @memberof AlertService
   */
  question(description: string, title: string = 'Question') {
    return from(swal(title, description, 'question'));
  }
  questionWithCancel(description: string, title: string = 'Question') {
    const option = {
      title: title,
      text: description,
      type: 'question',
      showCancelButton: true,
      allowOutsideClick: false
    } as SweetAlertOptions;

    return from(swal(option));
  }

  /**
   * show confirm alert
   *
   * @param {string} description
   * @param {string} [title='Question']
   * @memberof AlertService
   */
  confirm(description: string, title: string = 'Confirm', confirmText: string = 'OK', cancelText: string = 'Cancel') {
    const option = {
      title: title,
      text: description,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      allowOutsideClick: false
    } as SweetAlertOptions;

    return from(swal(option));
  }

  /**
   * show alert
   *
   * @param {AlertType} type
   * @param {string} title
   * @param {string} description
   * @memberof AlertService
   */
  show(type: AlertType, title: string, description: string) {
    return from(swal(title, description));
  }

  /**
   * show custom alert box
   *
   * @param {SweetAlertOptions} option
   * @memberof JpAlertService
   */
  alert(option: SweetAlertOptions) {
    return from(swal(option));
  }

  /**
   * Show notify small message
   *
   * @param {string} description
   * @memberof AlertService
   */

  miniSuccess(func?: string) {
    const toast = swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 1000
    });
    toast({
      type: 'success',
      title: `${func} Successfully`
    });
  }

  miniError(nameError?: string) {
    const toast = swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 1000
    });
    toast({
      type: 'error',
      title: `${nameError}`
    });
  }

  /**
   * Show notify message
   *
   * @param {string} description
   * @memberof AlertService
   */

}
