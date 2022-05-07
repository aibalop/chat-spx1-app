import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConversation } from '../interfaces/conversation.interface';
import { IMessage } from '../interfaces/message.interface';
import { HttpClientService } from '../services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  private _resource = 'v1/conversations'

  constructor(private httpClientService: HttpClientService) { }

  getMessages(conversationId: string, query: any = {}): Observable<Array<IMessage>> {
    return this.httpClientService.get(`${this._resource}/${conversationId}/messages`, query);
  }

  getConversationWithUser(userId: string, query: any = {}): Observable<IConversation> {
    return this.httpClientService.get(`${this._resource}/user-two/${userId}`, query);
  }

  createMessage(conversationId: string, message: string): Observable<IMessage> {
    return this.httpClientService.post(`${this._resource}/${conversationId}/messages`, { message });
  }

}
