import { Component } from '@angular/core';
import { SessionService } from './shared/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sessionService: SessionService) {
    this.init();
  }

  private async init(): Promise<void> {
    await this.sessionService.checkSession();
  }
}
