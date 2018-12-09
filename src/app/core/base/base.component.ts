import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServiceManager } from '../service/common/service-manager';
import { T2NavigatorService } from '../service/common/navigator.service';
import { AlertService } from '../service/common/alert.service';
import { UserInfo } from 'src/app/models';
import { LoadingService } from '../service/common/loading.service';
/**
 * Base class for business module components
 *
 * @export
 * @abstract
 * @class BaseComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
export abstract class BaseComponent
  implements OnInit, OnDestroy, AfterViewInit {
  isDestroyed$: Subject<void>;
  constructor() {
    this.isDestroyed$ = new Subject();
  }

  private _navigator: T2NavigatorService;
  /**
   * get JpNavigatorService instance
   *
   * @readonly
   * @type {JpNavigatorService}
   * @memberof BaseComponent
   */
  public get navigator(): T2NavigatorService {
    if (!this._navigator) {
      this._navigator = ServiceManager.get(T2NavigatorService);
    }
    return this._navigator;
  }

  private _alertService: AlertService;
  /**
   * get AlertService instance
   *
   * @readonly
   * @type {AlertService}
   * @memberof BaseComponent
   */
  public get alertService(): AlertService {
    if (!this._alertService) {
      this._alertService = ServiceManager.get(AlertService);
    }
    return this._alertService;
  }

  /**
   * isLogin
   *
   * @readonly
   * @type {boolean}
   * @memberof BaseComponent
   */
  public get isLogin(): boolean {
    if (localStorage.getItem('currentUser') === null && sessionStorage.getItem('currentUser') === null) {
      return false;
    } else {
      return true;
    }
  }

  private _loadingService: LoadingService;
  /**
   * Is Loading
   *
   * @readonly
   * @type {boolean}
   * @memberof BaseComponent
   */
  public get loadingService(): LoadingService {
    if (!this._loadingService) {
      this._loadingService = ServiceManager.get(LoadingService);
    }
    return this._loadingService;
  }

  public get userInfo(): UserInfo {
    if (localStorage.getItem('currentUser') === null && sessionStorage.getItem('currentUser') === null) {
      return null;
    } else if (localStorage.getItem('currentUser') !== null) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return JSON.parse(sessionStorage.getItem('currentUser'));
    }
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized.
   *
   * @memberof BaseComponent
   */
  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.onInit();
  }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized.
   *
   * @memberof BaseComponent
   */
  ngAfterViewInit(): void {
    this.onAfterViewInit();
  }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   *
   * @memberof BaseComponent
   */
  ngOnDestroy(): void {
    // unsubscribe observables
    this.isDestroyed$.next();
    this.isDestroyed$.complete();

    this.onDestroy();
  }

  /**
   * Initial processing for module component
   *
   * @memberof BaseComponent
   */
  onInit(): void { }

  /**
   * The processing before component is destroyed
   *
   * @memberof BaseComponent
   */
  onDestroy(): void { }

  /**
   * The processing after a component's view has been fully initialized.
   *
   * @memberof BaseComponent
   */
  onAfterViewInit(): void { }
}
