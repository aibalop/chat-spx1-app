import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { generateFromString } from 'generate-avatar'
import { IConversation } from 'src/app/shared/interfaces/conversation.interface';
import { IMessage } from 'src/app/shared/interfaces/message.interface';
import { User } from 'src/app/shared/models/user.model';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-conversation-list-item',
  templateUrl: './conversation-list-item.component.html',
  styleUrls: ['./conversation-list-item.component.scss'],
})
export class ConversationListItemComponent implements OnInit {

  _conversation: IConversation;
  userOne: User;
  userTwo: User;
  lastMessage: IMessage;

  @Input() set conversation(value: IConversation) {
    if (value) {
      this._conversation = value;
      this.userOne = new User(this._conversation.userOneId);
      this.userTwo = new User(this._conversation.userTwoId);
      this.lastMessage = this._conversation.lastMessage;
    }
  };

  avatar: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    public sessionService: SessionService
  ) { }

  ngOnInit() { }

  getAvatar(username: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;utf8,${generateFromString(username)}`);
  }

}
