const generateMessage = (username, text) => {
    return {
        username,
        text,
        timeStamp: new Date().getTime()
    }
}

const generateLocationMessage = (username, url) => {
    return {
        username,
        url,
        timeStamp: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}