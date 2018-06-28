import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Message } from 'primeng/api';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
@Injectable()
export class MessageService {
  private subject = new Subject<Message>();
  private message: Message;
  constructor() { }
  sendMessage(message: Message) {
    this.message = message;
  }

  clearMessage() {
    this.message = null;
  }

  getMessage() {
    return this.message;
  }
}
