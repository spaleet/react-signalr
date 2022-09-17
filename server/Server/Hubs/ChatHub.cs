using Microsoft.AspNetCore.SignalR;
using Server.Models;

namespace Server.Hubs;

public class ChatHub : Hub<IChatClient>
{
    private const string _botUser = "Bot";

    private readonly IDictionary<string, UserConnection> _connections;
    public ChatHub(IDictionary<string, UserConnection> connections)
    {
        _connections = connections;
    }

    public async Task JoinRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.RoomId);
        _connections[Context.ConnectionId] = userConnection;

        await Clients.Group(userConnection.RoomId)
                     .ReceiveMessage(_botUser, $"{userConnection.Username} has joined {userConnection.RoomId}");

    }

    public async Task SendMessage(string message)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out var userConnection))
        {
            await Clients.Groups(userConnection.RoomId)
                .ReceiveMessage(userConnection.Username, message);
        }
    }
}
