using Microsoft.AspNetCore.SignalR;
using Server.Models;

namespace Server.Hubs;

public class ChatHub : Hub
{
    private const string _botUser = "Bot";

    public ChatHub()
    {
    }

    public async Task JoinRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.RoomId);

        await Clients.Group(userConnection.RoomId)
            .SendAsync("ReceiveMessage", _botUser, $"{userConnection.Username} has joined {userConnection.RoomId}");

    }
}
