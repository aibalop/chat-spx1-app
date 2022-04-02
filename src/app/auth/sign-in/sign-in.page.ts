import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/api-v1/auth.service';
import { AlertDialogService } from 'src/app/shared/services/alert-dialog.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  isSend = false;

  constructor(
    private readonly toastService: ToastService,
    private readonly alertDialogService: AlertDialogService,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._signIn();
  }

  private async _signIn(): Promise<void> {
    try {
      this.isSend = true;
      const { username, password } = this.form.value;
      const signInSuccess = await this.authService.signIn(username, password).toPromise();
      this.toastService.success(signInSuccess.message);
      this.sessionService.token = signInSuccess.token;
      this.sessionService.userSession = signInSuccess.user;
      this.form.reset();
      this.isSend = false;
      this.router.navigateByUrl('/app/chats')
    } catch (error) {
      this.isSend = false;
      this.alertDialogService.catchError(error);
    }
  }

}
