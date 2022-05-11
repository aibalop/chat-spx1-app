import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: Socket;

  constructor() { }

  connect(): void {
    this.socket = io(environment.SOCKET_IO_URL);
    console.info('Socket Connect');
  }

  listenEvent<T>(eventName: string): Observable<T> {
    return new Observable(observer => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });
      return () => {
        // Execute this block when we unsuscribe of this observable
        // this.socket.disconnect();
      };
    })
  }

  emit(channel: string, data: any): void {
    this.socket.emit(channel, data);
  }

  disconnect(): void {
    this.socket.disconnect();
    console.info('Socket Disconnect');
  }

}
