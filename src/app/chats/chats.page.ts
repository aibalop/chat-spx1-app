import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersListModalComponent } from '../modals/users-list-modal/users-list-modal.component';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})
export class ChatsPage {

  selectedUser: User = null;

  constructor(
    private modalController: ModalController
  ) {}

  async onShowUserList(): Promise<void> {
    const modal = await this.modalController.create({
      component: UsersListModalComponent,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.selectedUser = data;
    }
  }

}
