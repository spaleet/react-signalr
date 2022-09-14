import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';

export function buildConnection(): HubConnection {
    const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7100/chat")
        .configureLogging(LogLevel.Information)
        .build();

    return connection;
}
export async function startConnection(connection: HubConnection): Promise<boolean> {
    try {
        await connection.start();
        console.log('Connected!');
        return true;
    } catch (e) {
        console.log('Connection failed: ', e)
        return false;
    }
}