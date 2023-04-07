import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Select from 'react-select'
import { Form } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";


function JournalPost({handleClosePost, showPost, postData, listAccount, listTransaction}){

  const [journal, setJournal] = useState({})

  const handleJournalTransaction = (event) => {
    const data = journal
    data['transaction'] = event.value
    setJournal(data)
  }

  const handleJournalAccount = (event) => {
    const data = journal
    data['account'] = event.value
    setJournal(data)
  }

  const handleJournalPosition = (event) => {
    const data = journal
    data['position'] = event.target.value
    setJournal(data)
  }

  const handleJournalAmount = (event) => {
    const data = journal
    data['amount'] = event.target.value
    setJournal(data)
  }

  const formatedListAccount = () => {
    let newListAccount = []
    listAccount?.map(i => {
      newListAccount.push({
        value:Number(i.id),
        label:`${i.c1}-${i.c2}${i.c3}${i.c4}${i.c5}${i.c6} ${i.account.toUpperCase()}`
      })
    })
    return newListAccount
  }

  const formatedListTransaction = () => {
    let newListTransaction = []
    listTransaction?.map(i => {
      newListTransaction.push({
        value:Number(i.id),
        label:`${i.date} | ${i.type.toUpperCase()}`
      })
    })
    return newListTransaction
  }

  return (
    <div>
      <Modal show={showPost} onHide={handleClosePost} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{"Add Journal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-3">
          <Form.Label>Transaction</Form.Label>
          <Select options={formatedListTransaction()} onChange={(event) => handleJournalTransaction(event)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Account</Form.Label>
          <Select options={formatedListAccount()} onChange={(event) => handleJournalAccount(event)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Position</Form.Label>
          <Form.Control onChange={(event) => handleJournalPosition(event)} type="text" placeholder="Position" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Amount</Form.Label>
          <Form.Control onChange={(event) => handleJournalAmount(event)} type="text" placeholder="Amount" />
        </Form.Group>
       

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {handleClosePost(); postData(journal)}}>
              Save
            </Button>
          <Button variant="secondary" onClick={() => handleClosePost()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JournalPost