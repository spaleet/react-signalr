using Microsoft.AspNetCore.SignalR;
using Server.Hubs.Clients;
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
            await Clients.Group(userConnection.RoomId)
                .ReceiveMessage(userConnection.Username, message);
        }
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out var userConnection))
        {
            _connections.Remove(Context.ConnectionId);
            Clients.Group(userConnection.RoomId).ReceiveMessage(_botUser, $"{userConnection.Username} has left");
        }

        return base.OnDisconnectedAsync(exception);
    }

}
