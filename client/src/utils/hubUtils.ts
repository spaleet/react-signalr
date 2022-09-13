import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';

export function buildConnection(): HubConnection {
    const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7100/chat")
        .configureLogging(LogLevel.Information)
        .build();
    
    return connection;
}