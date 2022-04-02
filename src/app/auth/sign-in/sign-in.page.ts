import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/api-v1/auth.service';
import { AlertDialogService } from 'src/app/shared/services/alert-dialog.service';
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
    private readonly authService: AuthService
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
      this.form.reset();
      // this.toastService.success('Bienvenido: ' + new User(newUser).getFullName(), 'Acción Exitosa');
      this.isSend = false;
    } catch (error) {
      this.isSend = false;
      this.alertDialogService.catchError(error);
    }
  }

}
