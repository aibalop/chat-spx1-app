import { Component } from '@angular/core';
import { SessionService } from './shared/services/session.service';
import { SocketioService } from './shared/services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private sessionService: SessionService,
    private socketioService: SocketioService) {
    this.init();
  }

  private async init(): Promise<void> {
    await this.sessionService.checkSession();
    
    if (this.sessionService.isLogged) {
      this.socketioService.connect();
    }
  }
}
