const rooms = []

const addPersonToRoom = (roomName) => {
    const index = rooms.findIndex(room => room.name === roomName)

    if (index === -1) {
        rooms.push({ name: roomName, peopleInRoom: 1 })
        return rooms
    }

    rooms[index].peopleInRoom++
    return rooms
}

const removePersonFromRoom = (roomName) => {
    const index = rooms.findIndex(room => room.name === roomName)
    
    if (index === -1) return undefined

    if (rooms[index].peopleInRoom === 1) {
        rooms.splice(index, 1)
        return rooms
    }

    rooms[index].peopleInRoom--
    return rooms
}

const getRooms = () => {
    return rooms
}

module.exports = {
    addPersonToRoom,
    removePersonFromRoom,
    getRooms
}