import { Observable } from 'rxjs';
import { api } from 'src/assets/config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patch } from 'webdriver-js-extender';

@Injectable()
export class HeaderService {
  getCategories(): any { throw new Error('Method not implemented.'); }

  getMenu(): Array<any> {
    const menu = [
      {
        name: 'Home', path: ''
      },
      {
        name: 'Home/Detail', path: 'detail'
      },
      {
        name: 'Home/Order', path: 'order'
      },
      {
        name: 'Home/Product', path: 'product'
      },
      {
        name: 'Home/Profile', path: 'my-account'
      },
      {
        name: 'Home/Order Detail', path: 'orderdetail'
      },
      {
        name: 'Home/Set Password', path: 'set-password'
      },
    ];
    return menu;
  }

  constructor(
    private http: HttpClient) { }

  public search(nameProduct, totalItems): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.post(api.apiServer + 'api/v1/Products/SearchProduct', {  NameProduct: nameProduct, TotalItems: totalItems});
  }
}
