import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/api-v1/users.service';
import { User } from 'src/app/shared/models/user.model';
import { AlertDialogService } from 'src/app/shared/services/alert-dialog.service';
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
    private readonly alertDialogService: AlertDialogService
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
      this.form.reset();
      this.toastService.success('Bienvenido: ' + new User(newUser).getFullName(), 'Acción Exitosa');
      this.isSend = false;
    } catch (error) {
      this.isSend = false;
      this.alertDialogService.catchError(error);
    }
  }

}
