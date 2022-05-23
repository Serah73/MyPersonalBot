let fs = require('fs');

const createDir = (nameDir) => {
    fs.mkdir(nameDir, (err) => {
        if(err) console.error("Error: Creating a directory", err)
    })
}
const createFile = (file, data) => {
    fs.appendFile(file, data, function (err) {
        if (err) console.log("Error: Creating a file", err);
    });
}

async function checkExist(name){
    fs.access(name, (err) => {
        return !!err;
    })
}
const createFileDir = async (name, data) => {
    let fileExist = await checkExist()
    if (fileExist) return false
    if (name.indexOf('.') === -1) {
        createDir(name);
        return true;
    }else {
        createFile(name, data);
        return true;
    }
}


module.exports = {
    checkExist,
    createFileDir
}