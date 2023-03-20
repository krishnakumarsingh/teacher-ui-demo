import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormComponent from './FormComponent';

const ModalComponent = ({show, handleClose, handleSave}) => {
  // e.preventDefault();
  //   console.log("Form was submitted, now the modal can be closed");
  //   handleClose();
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form was submitted, now the modal can be closed", e);
      handleClose();
    };
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponent submit={handleSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalComponent