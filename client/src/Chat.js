import React, { useState, useEffect } from 'react'

import { Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap'

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [msgObjList, setMsgObjList] = useState([])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMsgObjList((message) => [...message, data])
    })
  }, [socket])

  const sendMessage = async () => {
    await socket.emit('send_message', {
      username,
      room,
      currentMessage,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    })

    setMsgObjList((message) => [...message, { username, currentMessage }])
    setCurrentMessage('')
  }

  return (
    <>
      <ListGroup className='border'>
        {msgObjList &&
          msgObjList.map((message) =>
            message.username !== username ? (
              <ListGroup.Item className='d-flex justify-content-between align-items-start'>
                <div className='ms-2 me-auto'>
                  <div className='fw-bold'>{message.username}</div>
                  {message.currentMessage}
                </div>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item className='d-flex justify-content-between align-items-start bg-primary text-light'>
                <div className='ms-auto me-2 text-end'>
                  <div className='fw-bold'>{message.username}</div>
                  {message.currentMessage}
                </div>
              </ListGroup.Item>
            )
          )}
      </ListGroup>

      <InputGroup className='mb-3'>
        <FormControl
          as='textarea'
          aria-label='With textarea'
          aria-describedby='inputGroup-sizing-default'
          placeholder='Input your message'
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />

        <Button onClick={sendMessage}>Send Message</Button>
      </InputGroup>
    </>
  )
}

export default Chat
