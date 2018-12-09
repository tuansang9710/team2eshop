import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/assets/config/config';
import { Observable } from 'rxjs';

@Injectable()
export class ShowProductService {
  constructor(private http: HttpClient) { }

  getProByCat(id: number, numPage: number, pageSize = 6): Observable<any> {
    return this.http.post(`${api.apiServer}api/v1/Products/GetByIdCategories`, {
      Id: id,
      Page: numPage,
      PageSize: pageSize
    });
  }
}
