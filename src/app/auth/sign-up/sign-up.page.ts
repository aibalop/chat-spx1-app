import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/api-v1/auth.service';
import { UsersService } from 'src/app/shared/api-v1/users.service';
import { User } from 'src/app/shared/models/user.model';
import { AlertDialogService } from 'src/app/shared/services/alert-dialog.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  isSend = false;

  constructor(
    private readonly usersService: UsersService,
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

    this._signUp();
  }

  private async _signUp(): Promise<void> {
    try {
      this.isSend = true;
      const newUser = await this.usersService.create(this.form.value).toPromise();
      this.toastService.success('Bienvenido: ' + new User(newUser).getFullName(), 'Acción Exitosa');
      this, this._signIn();
    } catch (error) {
      this.isSend = false;
      this.alertDialogService.catchError(error);
    }
  }

  private async _signIn(): Promise<void> {
    try {
      const { username, password } = this.form.value;
      const signInSuccess = await this.authService.signIn(username, password).toPromise();
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
