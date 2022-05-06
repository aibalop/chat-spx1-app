import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from 'src/app/shared/models/user.model';
import { generateFromString } from 'generate-avatar';
import { ConversationsService } from 'src/app/shared/api-v1/conversations.service';
import { IMessage } from 'src/app/shared/interfaces/message.interface';
import { AlertDialogService } from 'src/app/shared/services/alert-dialog.service';
import { IConversation } from 'src/app/shared/interfaces/conversation.interface';

@Component({
  selector: 'app-conversation-chat',
  templateUrl: './conversation-chat.component.html',
  styleUrls: ['./conversation-chat.component.scss'],
})
export class ConversationChatComponent implements OnInit {

  _user: User;

  avatar: SafeResourceUrl;

  messages: Array<IMessage> = [];

  conversation: IConversation;

  @Input() set user(value: User) {
    this.messages = [];
    this.conversation = null;
    if (value) {
      this._user = value;
      this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;utf8,${generateFromString(this._user.getUsername())}`);
      this._getConversation();
    }
  };

  constructor(
    private sanitizer: DomSanitizer,
    private conversationService: ConversationsService,
    private alertDialogService: AlertDialogService
  ) { }

  ngOnInit() { }

  private async _getConversation(): Promise<void> {
    try {
      this.conversation = await this.conversationService.getConversationWithUser(this._user._id).toPromise();
      this._getMessages();
    } catch (error) {
      this.alertDialogService.catchError(error);
    }
  }

  private async _getMessages(): Promise<void> {
    try {
      this.messages = await this.conversationService.getMessages(this.conversation._id).toPromise();
    } catch (error) {
      this.alertDialogService.catchError(error);
    }
  }

}
