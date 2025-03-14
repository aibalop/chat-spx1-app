import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertDialogService } from '../shared/services/alert-dialog.service';
import { SessionService } from '../shared/services/session.service';
import { generateFromString } from 'generate-avatar';
import { SocketioService } from '../shared/services/socketio.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(
    private alertDialogService: AlertDialogService,
    public sessionService: SessionService,
    private sanitizer: DomSanitizer,
    private socketioService: SocketioService
  ) { }

  async onSignOut(): Promise<void> {
    const answer = await this.alertDialogService.confirm('Confirmar', '¿Cerrar sesión?');
    if (answer) {
      this.sessionService.logout();
      this.socketioService.disconnect();
    }
  }

  getAvatar(username: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;utf8,${generateFromString(`@${username}`)}`);
  }

}
