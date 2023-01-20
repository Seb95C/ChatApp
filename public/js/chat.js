const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', () => {
    
    socket.emit('message', document.querySelector('#messageText').value)
    event.preventDefault()
})