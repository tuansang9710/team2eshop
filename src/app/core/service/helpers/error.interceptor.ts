import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../common/authentication.service';
import { BaseComponent } from '../../base/base.component';

@Injectable()
export class ErrorInterceptor extends BaseComponent implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        location.reload(true);
      } else if (err.status === 0) {
        this.navigator.navigate(`error/connectionrefused`); // ERR_CONNECTION_REFUSED
      } else {
        this.navigator.navigate(`error/${err.status}`);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
