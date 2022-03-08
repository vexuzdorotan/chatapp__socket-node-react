import { useState } from 'react'
import io from 'socket.io-client'

import { Container, InputGroup, FormControl, Button } from 'react-bootstrap'

import Chat from './Chat'

import './App.css'

const socket = io('http://localhost:3001')

const App = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    socket.emit('join_room', room)
  }

  return (
    <Container className='h-100 d-flex justify-content-center align-items-center overflow-auto'>
      <div className='App'>
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

        <Button variant='primary' onClick={joinRoom}>
          Join Room
        </Button>

        <Chat socket={socket} username={username} room={room} />
      </div>
    </Container>
  )
}

export default App
