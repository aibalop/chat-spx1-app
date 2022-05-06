import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/shared/interfaces/message.interface';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-conversation-chat-bubble',
  templateUrl: './conversation-chat-bubble.component.html',
  styleUrls: ['./conversation-chat-bubble.component.scss'],
})
export class ConversationChatBubbleComponent implements OnInit {

  @Input() message: IMessage;

  userSessionId: string;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.userSessionId = this.sessionService.userSession._id
  }

}
