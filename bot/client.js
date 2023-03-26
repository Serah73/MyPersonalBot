const WebSocket = require("ws");

const ServerAddress = "ws://127.0.0.1:5001";
//const ServerAddress = "wss://websocket-server-serahdummy-bot.glitch.me/";
const wsClient = new WebSocket(ServerAddress, {
    headers: {
        "user-agent": "Opera"
    }
})

wsClient.on('open', () => {
    wsClient.send("Hello there!")
})

wsClient.on('message', (msg) => {
    console.log("Recieved a message from the server:\n\t" + msg)
}) 