import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationChatComponent } from './conversation-chat/conversation-chat.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ConversationListItemComponent } from './conversation-list-item/conversation-list-item.component';
import { ConversationChatBubbleComponent } from './conversation-chat-bubble/conversation-chat-bubble.component';

@NgModule({
  declarations: [
    ConversationChatComponent,
    ConversationListItemComponent,
    ConversationChatBubbleComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    ConversationChatComponent,
    ConversationListItemComponent,
    ConversationChatBubbleComponent
  ]
})
export class ComponentsModule { }
