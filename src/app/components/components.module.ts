import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationChatComponent } from './conversation-chat/conversation-chat.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ConversationListItemComponent } from './conversation-list-item/conversation-list-item.component';

@NgModule({
  declarations: [
    ConversationChatComponent,
    ConversationListItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    ConversationChatComponent,
    ConversationListItemComponent
  ]
})
export class ComponentsModule { }
