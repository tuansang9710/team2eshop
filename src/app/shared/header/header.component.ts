import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { takeUntil, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import { AuthenticationService } from 'src/app/core/service/common/authentication.service';
import { ModalService } from 'src/app/core/service/common/modal.service';
import { CartService } from 'src/app/core/service/shared/cart.service';
import { HeaderService } from 'src/app/core/service/shared/header.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-t2-header',
  templateUrl: './header.component.html',
  providers: [CartService, HeaderService]
})
export class HeaderComponent extends BaseComponent {
  totalCart;
  state;
  isNavbarCollapsed = true;
  Data;
  totalItems = 5;
  searchForm: FormGroup;
  noResult = false;
  selected: string;

  constructor(
    private modal: ModalService,
    private authenticationService: AuthenticationService,
    private hearderService: HeaderService,
    private fb: FormBuilder,
  ) {
    super();
  }

  onInit() {
    this.searchForm = this.fb.group({
      searchInput: ''
    });
    // Handing data for search
    this.searchForm.get('searchInput').valueChanges.pipe(
      debounceTime(300), tap(x => {
        this.hearderService.search(x, this.totalItems).pipe().subscribe((res: any) => {
          if (res.Status) {
            this.Data = res.Data;
          }
        });
      })).subscribe();
  }

  // Clear data search
  clearDataSearch() {
      this.searchForm.reset();
    }

  /**
   * Display total data search
   *
   * @param {*} Data
   * @returns
   * @memberof HeaderComponent
   */
  displayFn(Data: any) {
    if (Data) { return Data.NameProduct; }
  }

  /**
   * Open modal login
   *
   * @memberof HeaderComponent
   */
  btnLogin() {
    this.modal.open(LoginComponent, { type: 'login' }, { centered: true }).pipe(takeUntil(this.isDestroyed$)).subscribe();
  }

  /**
   * Log out
   *
   * @memberof HeaderComponent
   */
  btnLogout() {
    this.alertService.warningWithCancel('Are you sure you want to log out?').pipe(takeUntil(this.isDestroyed$)).subscribe(status => {
      if (status.value === true) {
        this.authenticationService.logout();
      }
    });
  }

  /**
   * Open model register
   *
   * @memberof HeaderComponent
   */
  btnRegister() {
    this.modal.open(LoginComponent, { type: 'register' }, { centered: true });
  }

  /**
   * Go to detail
   *
   * @param {*} data
   * @memberof HeaderComponent
   */
  navigate(data) {
    this.navigator.navigate(`/detail/${data}`);
  }

  /**
   * Get total product
   *
   * @returns {number}
   * @memberof HeaderComponent
   */
  getTotalItem(): number {
    if (localStorage.getItem('Cart') !== null) {
      const noOfOrder = localStorage.getItem('Cart').split('},{');
      return noOfOrder.length;
    } else {
      return 0;
    }
  }

  /**
   * Get user when it change
   *
   * @returns {string}
   * @memberof HeaderComponent
   */
  getNameUser(): string {
    const nameUser = JSON.parse(sessionStorage.getItem('currentUser')).UserName;
    return nameUser;
  }
}
