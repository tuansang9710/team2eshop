import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/assets/config/config';
import { ListProduct } from 'src/app/models/list-product';

@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(private http: HttpClient) { }

  public addToCart(idUser, idProduct, quantity = 1): Observable<any> {
    return this.http.post(api.apiServer + 'api/v1/Cart/AddToCart', { IdUser: idUser, IdProduct: idProduct, Quantity: quantity });
  }

  getTotalCart() {
    if (localStorage.getItem('Cart') === null) {
      return 0;
    } else {
      const value = JSON.parse(localStorage.getItem('Cart'));
      return value.length;
    }
  }

  getCartById(idUser): Observable<any> {
    return this.http.get(api.apiServer + 'api/v1/Cart/GetCartByIdUser/' + idUser);
  }

  addToCartNotLogin(idUser: number, listProduct: ListProduct[]) {
    return this.http.post(api.apiServer + 'api/v1/Cart/AddToCartNotLogin', { IdUser: idUser, ListProduct: listProduct });
  }
}
