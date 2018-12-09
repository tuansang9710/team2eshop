import { api } from 'src/assets/config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  /**
   * Get info user
   *
   * @returns
   * @memberof UserService
   */
  getAll() {
    return this.http.get<User[]>(`${api.apiServer}/users`);
  }
}
