import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/assets/config/config';
import { Observable } from 'rxjs';

@Injectable()
export class UserInfoService {
  constructor(private http: HttpClient) { }

  getAllUserInfo(idUser): Observable<any> {
    return this.http.get(api.apiServer + '/api/v1/Users/GetUserById/' + `${idUser}`);
  }

  updateUserInfo(idUser): Observable<any> {
    return this.http.post(api.apiServer + '/api/v1/Users/UpdateUser', idUser);
  }

  purchaseHistory(idUser, page, pageSize = 2): Observable<any> {
    return this.http.post(api.apiServer + 'api/v1/Cart/PurchaseHistory', { Id: idUser, PageSize: pageSize, Page: page });
  }

  changePassword(idUser, OldPassword: string, NewPassword: string): Observable<any> {
    return this.http.post(`${api.apiServer}/api/v1/Users/ChangePassword`, { idUser, oldPassword: OldPassword, newPassword: NewPassword });
  }

  /**
  * get date in DatePick bootstrap keep the date based on the original time zone
  * @param {*} inputConvertDate
  * @returns {string}
  * @memberof DatePickerService
  */
  GetDatePickerOriginalTimeZone(inputConvertDate: any): string {
    const date = new Date(inputConvertDate),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  changeStatus(idOrder): Observable<any> {
    return this.http.post(api.apiServer + 'api/v1/Cart/UpdateStatusOrder', { IdOrder: idOrder });
  }
}
