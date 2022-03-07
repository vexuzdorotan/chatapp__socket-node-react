import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import './App.css'

const socket = io('http://localhost:3001')

const App = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data)
    })
  }, [socket])

  const joinRoom = () => {
    socket.emit('join_room', room)
  }

  const sendMessage = () => {
    socket.emit('send_message', { username, room, currentMessage })
  }

  return (
    <div className='App'>
      <input
        type='text'
        placeholder='Input your username'
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type='text'
        placeholder='Input room ID'
        onChange={(e) => setRoom(e.target.value)}
      />

      <input
        type='text'
        placeholder='Input your message'
        onChange={(e) => setCurrentMessage(e.target.value)}
      />

      <button onClick={joinRoom}>Join Room</button>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  )
}

export default App
