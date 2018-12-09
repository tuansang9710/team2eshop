import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/core/service/modules/user-info.service';
import { BaseComponent } from 'src/app/core/base/base.component';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { UserInfoModel } from '../my-account/my-account.modal';

@Component({
  selector: 'app-t2-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
  providers: [UserInfoService]
})

export class MyAccountComponent extends BaseComponent {
  dataUserInfo;
  userInfoForm: FormGroup;
  dataUserInfoSave: UserInfoModel;
  minDate = new Date(1960, 0, 1);
  maxDate = new Date();

  constructor(private userInfoService: UserInfoService, private fb: FormBuilder) {
    super();
    // Init form
    this.userInfoForm = this.fb.group(
      {
        userName: [''],
        email: [''],
        phoneNumber: [''],
        address: [''],
        sex: [''],
        birthDay: ['']
      });
  }

  /**
   * Show data in profile
   *
   * @memberof MyAccountComponent
   */
  onInit() {
    this.userInfoService.getAllUserInfo(this.userInfo.Id).pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
      this.dataUserInfo = res.Data;
      this.userInfoForm = this.fb.group({
        userName: [this.dataUserInfo.UserName, [Validators.required]],
        email: [this.dataUserInfo.Email, [Validators.required, Validators.email]],
        phoneNumber: [this.dataUserInfo.PhoneNumber, [Validators.required]],
        address: [this.dataUserInfo.Address],
        sex: [this.dataUserInfo.Sex],
        birthDay: [this.dataUserInfo.BirthDay]
      });
    });
  }

  /**
   * Save information user
   *
   * @memberof MyAccountComponent
   */
  btnSaveInfo() {
    const params = {
      Id: this.userInfo.Id,
      UserName: this.userInfoForm.controls.userName.value,
      PhoneNumber: this.userInfoForm.controls.phoneNumber.value,
      Address: this.userInfoForm.controls.address.value,
      Email: this.userInfoForm.controls.email.value,
      Sex: this.userInfoForm.controls.sex.value,
      BirthDay: this.userInfoService.GetDatePickerOriginalTimeZone(this.userInfoForm.controls.birthDay.value),
    };
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    user.Email = params.Email;
    user.PhoneNumber = params.PhoneNumber;
    user.UserName = params.UserName;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.userInfoService.updateUserInfo(params).pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
      if (res.Status) {
        this.alertService.success(res.Message);
      }
    });
  }
}
