import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/shared/api-v1/users.service';
import { User } from 'src/app/shared/models/user.model';
import { AlertDialogService } from 'src/app/shared/services/alert-dialog.service';

@Component({
  selector: 'app-users-list-modal',
  templateUrl: './users-list-modal.component.html',
  styleUrls: ['./users-list-modal.component.scss'],
})
export class UsersListModalComponent implements OnInit {

  usersList: Array<User> = [];

  constructor(
    public modalController: ModalController,
    private readonly UsersService: UsersService,
    private readonly alertDialogService: AlertDialogService
  ) { }

  ngOnInit() {
    this._getUsersList();
  }

  private async _getUsersList(): Promise<void> {
    try {
      const users = await this.UsersService.getAll().toPromise();
      this.usersList = users.map(user => new User(user));
    } catch (error) {
      this.alertDialogService.catchError(error);
    }
  }

  onSelectUser(user: User): void {
    this.modalController.dismiss(user);
  }

}
