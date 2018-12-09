import { Injectable } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

const stateKey = {
  currentModal: 'currentModal',
};
/**
 * State management service
 *
 * @export
 * @class StateService
 */
@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state = new Map<string, any>();

  set currentModal(modal: NgbModalRef) {
    this.store(stateKey.currentModal, modal);
  }

  get currentModal() {
    return this.state.get(stateKey.currentModal);
  }

  /**
   * Store data to state management and local stored
   *
   * @param {string} key
   * @param {*} value
   * @memberof StateService
   */
  store(key: string, value: any) {
    this.state.set(key, value);
  }
}
