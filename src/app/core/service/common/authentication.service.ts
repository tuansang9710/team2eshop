import { api } from 'src/assets/config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { CartService } from '../shared/cart.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient, private cartService: CartService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${api.apiServer}api/v1/Account/LoginUser`, { UserName: username, PassWord: password })
      .pipe(map(user => {
        if (user.Status) {
          const userJwt = user.Data;
          if (localStorage.getItem('Cart') !== null) {
            const listProduct = JSON.parse(localStorage.getItem('Cart'));
            this.cartService.addToCartNotLogin(user.Data.Id, listProduct).subscribe();
          } else {
            this.cartService.getCartById(user.Data.Id).subscribe(res => {
              const listProduct = [];
              if (res.Data.length > 0) {
                res.Data.forEach(element => {
                  const item = {
                    quantity: element.Quantity || null,
                    product: element.IdProduct || null
                  };
                  if (item.quantity !== null && item.product !== null) {
                    listProduct.push(item);
                  }
                });
                localStorage.setItem('Cart', JSON.stringify(listProduct));
              }
            });
          }
          // login successful if there's a jwt token in the response
          if (!isNullOrUndefined(userJwt)) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(userJwt));
            return true;
          }
          return false;
        } else {
          return false;
        }
      }));
  }

  /**
   * Call API register
   *
   * @param {string} username
   * @param {string} phoneNumber
   * @param {string} password
   * @param {string} email
   * @returns {Observable<any>}
   * @memberof AuthenticationService
   */
  register(username: string, phoneNumber: string, password: string, email: string): Observable<any> {
    return this.http.post(`${api.apiServer}api/v1/Users/Register`, {
      UserName: username,
      PhoneNumber: phoneNumber,
      PassWord: password,
      Email: email,
    });
  }

  /**
   * Log out
   *
   * @memberof AuthenticationService
   */
  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }
}
