import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor(private socket: Socket) { }

  connect(): void {
    this.socket.connect();
    console.info('Socket Connect');
    
  }

  listenEvent<T>(eventName: string): Observable<T> {
    return this.socket.fromEvent(eventName);
  }

  emit(channel: string, data: any): void {
    this.socket.emit(channel, data);
  }

  disconnect(): void {
    this.socket.disconnect();
    console.info('Socket Disconnect');
  }

}
