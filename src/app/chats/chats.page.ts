import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersListModalComponent } from '../modals/users-list-modal/users-list-modal.component';
import { UsersService } from '../shared/api-v1/users.service';
import { IConversation } from '../shared/interfaces/conversation.interface';
import { User } from '../shared/models/user.model';
import { AlertDialogService } from '../shared/services/alert-dialog.service';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})
export class ChatsPage implements OnInit {

  selectedUser: User = null;

  conversations: IConversation[] = [];

  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
    private alertDialogService: AlertDialogService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this._getConversations();
  }

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

  async _getConversations(): Promise<void> {
    try {
      this.conversations = await this.usersService.getAllConversations(this.sessionService.userSession._id).toPromise();
    } catch (error) {
      this.alertDialogService.catchError(error);
    }
  }

  onSelectUserFromConversation(selectedUser: User): void {
    this.selectedUser = selectedUser;
  }

}
