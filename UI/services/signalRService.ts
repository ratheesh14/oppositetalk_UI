import * as signalR from '@microsoft/signalr';
import { Message, TypingNotification } from '@/types/message';

class SignalRManager {
  private connection: signalR.HubConnection | null = null;
  private messageListeners: ((message: Message) => void)[] = [];
  private typingListeners: ((notification: TypingNotification) => void)[] = [];

  public async startConnection(hubUrl: string = '/hubs/chat') {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('oppositetalk_token') : '';

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => token || '',
      })
      .withAutomaticReconnect()
      .build();

    this.connection.on('ReceiveMessage', (message: Message) => {
      this.messageListeners.forEach((listener) => listener(message));
    });

    this.connection.on('UserTyping', (notification: TypingNotification) => {
      this.typingListeners.forEach((listener) => listener(notification));
    });

    try {
      await this.connection.start();
      console.log('[SignalR] Connected successfully.');
    } catch (err) {
      console.warn('[SignalR] Real-time hub connection notice:', err);
    }
  }

  public onReceiveMessage(callback: (message: Message) => void) {
    this.messageListeners.push(callback);
    return () => {
      this.messageListeners = this.messageListeners.filter((l) => l !== callback);
    };
  }

  public onTyping(callback: (notification: TypingNotification) => void) {
    this.typingListeners.push(callback);
    return () => {
      this.typingListeners = this.typingListeners.filter((l) => l !== callback);
    };
  }

  public async sendTyping(conversationId: string, isTyping: boolean) {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke('SendTypingNotification', conversationId, isTyping);
    }
  }

  public async stopConnection() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }
}

export const signalRService = new SignalRManager();
