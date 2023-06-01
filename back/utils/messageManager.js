"use strict"

const Success = (code, message) => {
    return {
        code: !code? 200 : code,
        message: !message? "OK" : message
    }
}

const Error = (code, message, location) => {
    return {
        code: !code? 500 : code,
        message: message,
        location: location
    }
}


function writeMessage(message, code, location) {
    if (!code && !message) return Error(location, 500, 'Message void!');
    if (!location) return Error(location, code, message);
    let msg = Success(code, message);

    return JSON.stringify(msg);
}

module.exports = {
    TypesMessage,
    writeMessage
}