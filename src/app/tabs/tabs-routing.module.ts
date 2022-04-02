import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'chats',
        loadChildren: () => import('../chats/chats.module').then(m => m.ChatsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/app/chats',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/chats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
