import { api } from 'src/assets/config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LeftMenuService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.post(`${api.apiServer}api/v1/Categories/GetCustom`, { NoOfRow: 10 });
  }
}
