import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from 'src/assets/config/config';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) { }

  getByListProduct(params: Array<number>): Observable<any> {
    return this.http.post(api.apiServer + 'api/v1/Products/GetByListId', { IdProduct: params });
  }

  getPayment(idUser): Observable<any> {
    return this.http.post(api.apiServer + 'api/v1/Cart/PaymentCart', { idUser: idUser });
  }
}
