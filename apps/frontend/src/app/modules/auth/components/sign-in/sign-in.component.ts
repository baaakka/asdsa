import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { AuthService } from '../../../../services/auth.service';
import { Watcher } from '../../../../shared/classes/watcher';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'cake-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends Watcher implements OnInit, OnDestroy {
  form!: FormGroup;

  waitingResponse = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  submit() {
    const body = {
      ...this.form.value
    }
    this.waitingResponse = true;
    this.apiService.signIn(body).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.waitingResponse = false;
      this.authService.signIn(res);
      this.router.navigate(['/home']);
    }, () => {
      this.waitingResponse = false;
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

  isError(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.errors && (this.form.get(controlName)?.dirty || this.form.get(controlName)?.touched)
  }

  override ngOnDestroy(): void {
      super.ngOnDestroy();
  }
}
