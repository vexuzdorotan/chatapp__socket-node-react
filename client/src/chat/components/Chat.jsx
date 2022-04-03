import React, { useState, useEffect, useRef } from 'react'

import {
  Row,
  Col,
  Button,
  ListGroup,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Chat = ({ socket, username, room, setUsername, setRoom, setJoined }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [msgObjList, setMsgObjList] = useState([])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    const element = document.querySelector('.list-group')

    element.scrollTop = element.scrollHeight
  }

  useEffect(scrollToBottom, [msgObjList])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMsgObjList((message) => [...message, data])
    })
  }, [socket])

  const sendMessage = async () => {
    if (currentMessage === '') return

    const dateToday = new Date()
    const time = dateToday.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    await socket.emit('send_message', {
      username,
      room,
      currentMessage,
      time,
    })

    setMsgObjList((message) => [...message, { username, currentMessage, time }])

    setTimeout(() => {
      setCurrentMessage('')
    }, 0)
  }

  const logout = () => {
    setUsername('')
    setRoom('')
    setJoined(false)
  }

  return (
    <>
      <div className='chat-header'>
        <Row className='justify-content-between'>
          <Col>
            <h3 className='text-white'>Welcome, {username}</h3>
            <h5 className='text-white'>Room: {room}</h5>
          </Col>
          <Col className='col-auto align-self-end'>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className='text-white'
              style={{ height: '2rem' }}
              onClick={logout}
            />
          </Col>
        </Row>
      </div>
      <div className='chat-content'>
        <ListGroup className='border bg-white'>
          {msgObjList &&
            msgObjList.map((message, idx) =>
              message.username !== username ? (
                <ListGroup.Item
                  className='d-flex justify-content-between align-items-start'
                  key={idx}
                >
                  <div className='ms-2 me-auto'>
                    <div>
                      <span className='fw-bold'>{message.username}</span>{' '}
                      <small className='text-secondary'>{message.time}</small>
                    </div>
                    {message.currentMessage}
                  </div>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item
                  className='d-flex justify-content-between align-items-start bg-primary text-light'
                  key={idx}
                >
                  <div className='ms-auto me-2 text-end'>
                    <div>
                      <span className='fw-bold'>{message.username}</span>{' '}
                      <small className='text-secondary'>{message.time}</small>
                    </div>
                    {message.currentMessage}
                  </div>
                </ListGroup.Item>
              )
            )}
        </ListGroup>
        <div ref={messagesEndRef} />
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
