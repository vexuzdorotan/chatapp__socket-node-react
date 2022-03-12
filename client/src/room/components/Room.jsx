import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

const Room = ({socket, room, setUsername, setRoom, setJoined}) => {
  const joinRoom = () => {
    socket.emit('join_room', room)
    setJoined(true)
  }

  return (
    <>
      <InputGroup>
        <FormControl
          aria-label='default'
          placeholder='Input your username'
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <FormControl
          aria-label='default'
          placeholder='Input room ID'
          onChange={(e) => setRoom(e.target.value)}
        />
      </InputGroup>

      <Button className="w-100" variant='primary' onClick={joinRoom}>
        Join Room
      </Button>
    </>
  )
}

export default Room
