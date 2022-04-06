import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UsersListModalComponent } from './users-list-modal/users-list-modal.component';

@NgModule({
  declarations: [
    UsersListModalComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class ModalsModule { }
