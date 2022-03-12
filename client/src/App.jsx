import { useState } from 'react'
import io from 'socket.io-client'

import { Container } from 'react-bootstrap'

import Room from './room/components/Room'
import Chat from './chat/components/Chat'

import './App.css'

const socket = io('http://localhost:3001')

const App = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <Container className='h-100 d-flex justify-content-center align-items-center overflow-auto'>
      <div className='App'>
        {!joined ? (
          <Room
            socket={socket}
            room={room}
            setUsername={setUsername}
            setRoom={setRoom}
            setJoined={setJoined}
          />
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </Container>
  )
}

export default App
