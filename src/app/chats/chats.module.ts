import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatsPage } from './chats.page';

import { ChatsPageRoutingModule } from './chats-routing.module';
import { ModalsModule } from '../modals/modals.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatsPageRoutingModule,
    ModalsModule,
    ComponentsModule
  ],
  declarations: [ChatsPage]
})
export class ChatsPageModule {}
