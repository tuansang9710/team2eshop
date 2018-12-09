import { api } from 'src/assets/config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  public getTopSelling(): Observable<any> {
    return this.http.post(api.apiServer + 'api/v1/Products/TopSelling', { NoOfRow: 6 });
  }

  public getNewProduct(): Observable<any> {
    return this.http.post(api.apiServer + 'api/v1/Products/NewProduct', { NoOfRow: 6 });
  }
}
