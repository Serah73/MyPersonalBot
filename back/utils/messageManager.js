"use strict"

const TypesMessage = {
    success: 0,
    warning: 1,
    error: 2,
    internalError: 3,
    token: 4
}

function returnTypeMessageStr(Type)
{
    if (Type === TypesMessage.success) return "Success";
    if (Type === TypesMessage.warning) return "Warning";
    if (Type === TypesMessage.error) return "Error";
    if (Type === TypesMessage.token) return "Token";
    else
        return "Type not found!";
}

const Success = (location) => {
    return {
        location: location,
        type: "Success",
        description: "OK"
    }
}

const Error = (location, description) => {
    return {
        location: location,
        type: "Error",
        description: description
    }
}

const Token = (description) => {
    return {
        type: "Token",
        token: description
    }
}

function createMessage(location, description, types) {
    if (types === TypesMessage.success) { return Success(location); }
    if (types === TypesMessage.error) { return Error(location, description); }
    if (types === TypesMessage.token) { return Token(description); }
    
    let messageObj = {
        location: location,
        type: types,
        description: description
    }
    return messageObj
}


function returnMessageInfo(location, type, description) {
    let typeStr = returnTypeMessageStr(type);
    return `${typeStr}! in "${location}":\n\t${description}`;
}

module.exports = {
    TypesMessage,
    createMessage,
    //returnMessageInfo
}