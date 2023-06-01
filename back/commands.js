"use strict"

const { TypesMessage } = require("./utils/messageManager");

function Help(correctUserLogin) {
    let guide = "User help:\n",options;
    if (!correctUserLogin) {
        options = "\t1 - Sign Up\n";
        options += "\t2 - Log In\n";
    } else {
        options = "\tUnavailable\n"
    }

    return guide + options;
}
  
const Register = (socket, option) => {
    socket.on('message', (msg) => {
        let message = JSON.parse(msg);
        if (option == 1) {
            return new Promise(async (resolve, reject) => {
                let res = await userRegister(message);
                if (res == undefined || res.type == TypesMessage.error) reject("Something wrong!");
                else {
                    resolve(res);
                }
            })
        }
        else return;
    })
}

async function aRegister(socket, option) {
    socket.on('message', async (msg) => {
        let res, message = JSON.parse(msg);
        
        if (option === 1) { res = await userRegister(message) }
        if (option === 2) { res = await userLogin(message) }

        if (res === undefined) socket.send("Ups, something wrong!");
        if (res.type == TypesMessage.error) {
            console.log("Error with " + res.location + "\n\t" + res.description);
            socket.send("Ups, something wrong!");
            socket.send(menuLogin);
            return TypeExit.replay;
        }
        if (res.type == TypesMessage.success) {
            socket.send(res.description);
            return TypeExit.success;
        }
    })
}

module.exports = {
    Register,
    Help
}