import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotAuthGuard } from './shared/guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    canActivate: [NotAuthGuard],
    children: [
      {
        path: 'sign-up',
        loadChildren: () => import('./auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./auth/sign-in/sign-in.module').then(m => m.SignInPageModule)
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
