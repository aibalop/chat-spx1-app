import { Component } from '@angular/core';
import { AlertDialogService } from '../shared/services/alert-dialog.service';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(
    private alertDialogService: AlertDialogService,
    public sessionService: SessionService
  ) {}

  async onSignOut(): Promise<void> {
    const answer = await this.alertDialogService.confirm('Confirmar', '¿Cerrar sesión?');
    if (answer) {
      this.sessionService.logout();
    }
  }

}
