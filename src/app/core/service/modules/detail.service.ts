import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/assets/config/config';
import { Observable } from 'rxjs';

@Injectable()
export class DetailService {
  constructor(private http: HttpClient) { }

  getDetail(param): Observable<any> {
    return this.http.get(`${api.apiServer}api/v1/Products/ProductDetail/${param}`);
  }
}
