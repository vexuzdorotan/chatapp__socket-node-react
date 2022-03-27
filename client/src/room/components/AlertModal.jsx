import React from 'react'

import { Modal, Button } from 'react-bootstrap'

const AlertModal = (props) => {
  const { modalTitle, modalBody, ...rest } = props

  return (
    <>
      <Modal
        {...rest}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            <h3>{props.modalTitle}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.modalBody &&
            props.modalBody.map((item, idx) => <p key={idx}>{item}</p>)}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AlertModal
