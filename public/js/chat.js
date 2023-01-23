const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageText = $messageForm.querySelector('input')
const $messageButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (url) => {
    console.log(url)
    const html = Mustache.render(locationTemplate, {
        url
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', () => {
    // Disable form
    $messageButton.setAttribute('disabled', 'disabled')

    let message = $messageText.value

    socket.emit('message', message, (error) => {
        //Reenable form
        $messageButton.removeAttribute('disabled')
        $messageText.value = ''
        $messageText.focus()

        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })

    event.preventDefault()
})

$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {


        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Delivered location!')
            $sendLocationButton.removeAttribute('disabled')
        })
    })
})