import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

import AlertModal from './AlertModal'

const Room = ({ socket, username, room, setUsername, setRoom, setJoined }) => {
  const [modalShow, setModalShow] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalBody, setModalBody] = useState([])

  const joinRoom = () => {
    if (!username || !room) {
      setModalTitle('Invalid Input')
      setModalBody([])

      !username &&
        setModalBody((modalBody) => [...modalBody, 'Please enter username.'])
      !room &&
        setModalBody((modalBody) => [...modalBody, 'Please enter room ID.'])

      setModalShow(true)
      return
    }

    socket.emit('join_room', room)
    setJoined(true)
  }

  return (
    <>
      <InputGroup>
        <FormControl
          aria-label='default'
          placeholder='Enter your username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <FormControl
          aria-label='default'
          placeholder='Enter room ID'
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </InputGroup>

      <Button className='w-100' variant='primary' onClick={joinRoom}>
        Join Room
      </Button>

      <AlertModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalTitle={modalTitle}
        modalBody={modalBody}
      />
    </>
  )
}

export default Room
