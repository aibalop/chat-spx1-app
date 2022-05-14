import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UsersListModalComponent } from '../modals/users-list-modal/users-list-modal.component';
import { UsersService } from '../shared/api-v1/users.service';
import { IConversation } from '../shared/interfaces/conversation.interface';
import { User } from '../shared/models/user.model';
import { AlertDialogService } from '../shared/services/alert-dialog.service';
import { SessionService } from '../shared/services/session.service';
import { SocketioService } from '../shared/services/socketio.service';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})
export class ChatsPage implements OnInit {

  selectedUser: User = null;

  conversations: IConversation[] = [];

  subscription: Subscription;

  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
    private alertDialogService: AlertDialogService,
    private sessionService: SessionService,
    private socketioService: SocketioService
  ) { }

  ngOnInit(): void { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter Chats.page');
    this.selectedUser = null;
    this.conversations = [];
    this._listenMyConversations();
    this._getConversations();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave Chats.page');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private _listenMyConversations(): void {
    this.subscription = this.socketioService.listenEvent(`listen-conversation-list-user-${this.sessionService.userSession._id}`).subscribe(res => {
      this._getConversations();
    });
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
