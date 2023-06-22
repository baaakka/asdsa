/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Watcher } from '../../../../shared/classes/watcher';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { Role } from 'libs/lib-api-interface/src/lib/model/role';
import { HttpStatusCode } from '@angular/common/http';
import { CustomToasterService } from '../../../../services/toaster.service';
import { ToasterPosition } from 'apps/frontend/src/app/core/types/toaster-position';
import { environment } from 'apps/frontend/src/environments/environment';

@Component({
  selector: 'cake-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends Watcher implements OnInit, OnDestroy {
  form!: FormGroup;

  isRegisterDone = false;

  environment = environment;

  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private customToasterService: CustomToasterService) {
    super()
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifyPassword: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      recoveryPhase: ['asd', [Validators.required]],
    })
  }

  submit() {
    const body = {
      ...this.form.value,
      ...{role: Role.kol}
    }
    delete body.verifyPassword;
    this.apiService.signUp(body).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.authService.signIn(res);
      this.isRegisterDone = true;
    }, (err) => {
      if(err.status === HttpStatusCode.BadRequest && err.error.code === 'P2002') {
        this.customToasterService.showErrorToaster(ToasterPosition.topCenter, `User ${this.form.value.username} already exist`)
      }
    })
  }

  getEmailError():string {
    if(this.isError('email')) {
      if(this.form.get('email')?.hasError('required')) {
        return 'Email is required';
      }
      return 'Email is invalid'
    }
    return '';
  }

  getPasswordError() {
    if(this.isError('password')) {
      if(this.form.get('password')?.hasError('required')) {
        return 'Password is required';
      }
      return 'Password must be at least 6 characters long'
    }
    return '';
  }

  getVerifyPassError() {
    if(this.form.get('verifyPassword')?.touched && this.form.get('verifyPassword')?.value !== this.form.get('password')?.value) {
      return "Passwords don't match";
    }
    return '';
  }

  isError(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.errors && (this.form.get(controlName)?.dirty || this.form.get(controlName)?.touched)
  }

  override ngOnDestroy(): void {
      super.ngOnDestroy();
  }
}
