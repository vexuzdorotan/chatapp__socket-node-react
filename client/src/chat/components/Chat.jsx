import React, { useState, useEffect } from 'react'

import { Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [msgObjList, setMsgObjList] = useState([])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMsgObjList((message) => [...message, data])

      document
        .querySelector('.list-group')
        .scrollTo(0, document.body.scrollHeight)
    })
  }, [socket, currentMessage])

  const sendMessage = async () => {
    if (currentMessage === '') return

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
      <div className='chat-header'>
        <h3>Welcome, {username}</h3>
        <h5>Room: {room}</h5>
      </div>
      <div className='chat-content'>
        <ScrollToBottom>
          <ListGroup className='border'>
            {msgObjList &&
              msgObjList.map((message, idx) =>
                message.username !== username ? (
                  <ListGroup.Item
                    className='d-flex justify-content-between align-items-start'
                    key={idx}
                  >
                    <div className='ms-2 me-auto'>
                      <div className='fw-bold'>{message.username}</div>
                      {message.currentMessage}
                    </div>
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item
                    className='d-flex justify-content-between align-items-start bg-primary text-light'
                    key={idx}
                  >
                    <div className='ms-auto me-2 text-end'>
                      <div className='fw-bold'>{message.username}</div>
                      {message.currentMessage}
                    </div>
                  </ListGroup.Item>
                )
              )}
          </ListGroup>
        </ScrollToBottom>
      </div>

      <InputGroup className='mb-3'>
        <FormControl
          as='textarea'
          aria-label='With textarea'
          aria-describedby='inputGroup-sizing-default'
          placeholder='Input your message'
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />

        <Button onClick={sendMessage}>Send Message</Button>
      </InputGroup>
    </>
  )
}

export default Chat
