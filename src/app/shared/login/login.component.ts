import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/core/base/modal.component';
import { AuthenticationService } from 'src/app/core/service/common/authentication.service';


@Component({ selector: 'app-t2-login', templateUrl: './login.component.html' })
export class LoginComponent extends ModalComponent {
  type: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  submittedLogin = false;
  submittedResgister = false;
  isWrong = false;

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder, private authenticationService: AuthenticationService) {
    super(activeModal);
  }

  onInit() {
    this.type = this.entryData.type;
    this.InitRegisterForm();
  }

  /**
   * Init form
   *
   * @memberof LoginComponent
   */
  InitRegisterForm() {
    if (this.type === 'login') {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]]
      });
    } else {
      this.registerForm = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(12)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
        confirmPassword: ['', [Validators.required]]
      });
    }
    this.InitForm();
  }

  InitForm() {
    if (this.type === 'login') {
      this.loginForm.reset();
      this.submittedLogin = false;
    } else {
      this.registerForm.reset();
      this.submittedResgister = false;
    }
  }

  get lg() { return this.loginForm.controls; }
  get rg() { return this.registerForm.controls; }

  /**
   * Handing button forgot password
   *
   * @memberof LoginComponent
   */

  /**
   * Handing button login
   *
   * @memberof LoginComponent
   */
  btnSend() {
    this.type = 'login';
    this.InitRegisterForm();
  }

  /**
   * Handing button register
   *
   * @memberof LoginComponent
   */
  btnSignUp() {
    this.type = 'register';
    this.InitRegisterForm();
  }

  /**
   * Cancel
   *
   * @memberof LoginComponent
   */
  btnCancel() {
    this.activeModal.close();
  }

  changeSignUp() {
    this.type = 'register';
    this.InitRegisterForm();
  }

  changeSignIn() {
    this.type = 'login';
    this.InitRegisterForm();
  }
  /**
   * Handing login
   *
   * @returns
   * @memberof LoginComponent
   */
  btnLogin() {
    this.submittedLogin = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(res => {
        if (res) {
          this.alertService.success('Login Successful');
          this.activeModal.close();
        } else {
          this.loginForm.controls.email.markAsDirty();
          this.loginForm.controls.email.setErrors({ isWrong: true });
        }
      });
  }

  /**
   * Handing register
   *
   * @returns
   * @memberof LoginComponent
   */
  btnRegister() {
    this.submittedResgister = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const password = this.registerForm.controls.password.value;
    const confirmPassword = this.registerForm.controls.confirmPassword.value;
    if (password === confirmPassword) {
      this.authenticationService.register(
        this.registerForm.controls.username.value,
        this.registerForm.controls.phoneNumber.value,
        this.registerForm.controls.password.value,
        this.registerForm.controls.email.value)
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(res => {
          if (res.Status) {
            this.alertService.success(res.Message);
          } else {
            this.registerForm.controls.email.markAsDirty();
            this.registerForm.controls.email.setErrors({ isWrong: true });
          }
        });
    } else {
      this.alertService.error('Confirm Password not match');
      confirmPassword.setErrors({ isWrong: true });
    }
  }

  /**
   * Validate form
   *
   * @memberof LoginComponent
   */
  onRemoveIsWrong() {
    if (this.loginForm) {
      this.loginForm.controls.email.setErrors(null);
    }
    if (this.registerForm) {
      this.registerForm.controls.email.setErrors(null);
    }
  }
}
