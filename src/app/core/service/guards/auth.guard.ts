import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { ModalService } from '../common/modal.service';
import { BaseComponent } from '../../base/base.component';

@Injectable({ providedIn: 'root' })
export class AuthGuard extends BaseComponent implements CanActivate {
  private previousUrl: string;
  private currentUrl: string;
  constructor(private router: Router, private modalService: ModalService) {
    super();
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.navigator.navigateHomePage();
    this.modalService.open(LoginComponent, { type: 'login' }, { centered: true });
    return false;
  }
}
