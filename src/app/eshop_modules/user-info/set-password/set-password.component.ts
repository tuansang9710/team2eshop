import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from 'src/app/core/service/modules/user-info.service';
import { BaseComponent } from 'src/app/core/base/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-t2-set-password',
  templateUrl: './set-password.component.html',
  providers: [UserInfoService]
})

export class SetPasswordComponent extends BaseComponent {
  submitted = false;
  isWrong = false;
  formSetPassword: FormGroup;

  constructor(private fb: FormBuilder, private userInfoService: UserInfoService) {
    super();
  }

  onInit() {
    // Init form
    this.formSetPassword = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      retypeNewPassword: ['', [Validators.required]]
    });
  }
  // sp = form
  get sp() { return this.formSetPassword.controls; }

  /**
   * Handing confirm
   *
   * @returns
   * @memberof SetPasswordComponent
   */
  btnConfirm() {
    this.submitted = true;
    if (this.formSetPassword.invalid) {
      return;
    }
    const oldPassword = this.formSetPassword.controls.oldPassword.value;
    const newPassword = this.formSetPassword.controls.newPassword.value;
    const retypeNewPassword = this.formSetPassword.controls.retypeNewPassword.value;
    if (oldPassword !== newPassword) {
      if (newPassword !== retypeNewPassword) {
        this.alertService.error('Confirm Password not match');
        retypeNewPassword.setErrors({ isWrong: true });
      } else {
        this.userInfoService.changePassword(
          this.userInfo.Id,
          this.formSetPassword.controls.oldPassword.value,
          this.formSetPassword.controls.newPassword.value)
          .pipe(takeUntil(this.isDestroyed$)).subscribe(res => {
            if (res.Status) {
              this.alertService.success('Update Your New Password Successful');
              this.formSetPassword.controls['oldPassword'].setErrors( null );
              this.formSetPassword.controls['newPassword'].setErrors( null );
              this.formSetPassword.controls['retypeNewPassword'].setErrors( null );
            } else {
              this.alertService.error('Old Password Incorrect');
              oldPassword.setErrors({ isWrong: true });
            }
          });
      }
    } else {
      this.alertService.error('New and Old password are too similar');
      newPassword.setErrors({ isWrong: true });
    }
  }
}
