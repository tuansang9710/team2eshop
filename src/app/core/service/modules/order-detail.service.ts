import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderDetailService {

  constructor(private http: HttpClient) { }

}
