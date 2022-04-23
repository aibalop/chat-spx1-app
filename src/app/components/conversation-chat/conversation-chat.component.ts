import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from 'src/app/shared/models/user.model';
import { generateFromString } from 'generate-avatar';

@Component({
  selector: 'app-conversation-chat',
  templateUrl: './conversation-chat.component.html',
  styleUrls: ['./conversation-chat.component.scss'],
})
export class ConversationChatComponent implements OnInit {

  _user: User;

  avatar: SafeResourceUrl;

  @Input() set user(value: User) {
    if (value) {
      this._user = value;
      this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;utf8,${generateFromString(this._user.getUsername())}`);
    }
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() { }

}
