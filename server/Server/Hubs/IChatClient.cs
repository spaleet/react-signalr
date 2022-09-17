namespace Server.Hubs;

public interface IChatClient
{
    Task ReceiveMessage(string username, string message);
}
