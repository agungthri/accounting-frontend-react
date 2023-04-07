import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Select from 'react-select'
import { Form } from 'react-bootstrap';
import manageNewAccount from '../Utils/manageNewAccount';
import accountPostApi from "../Utils/accountPostApi";
import accountSelectFormat from '../Utils/accountSelectFormat';

const AccountPost = ({showPost, setShowPost, setPost, list}) => {
  const [accounts, setAccounts] = useState('')
  const [accountName, setAccountName] = useState('')

  const postData = (data) => {
    accountPostApi(data)
    .then((data) => setPost(data))
    .catch((data) => console.log("Error: ", data))
  }

    return (
    <div>
      <Modal show={showPost} onHide={setShowPost} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{"Add Account"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Account Derived From</Form.Label>
            <Select options={accountSelectFormat(list)} onChange={setAccounts}/>  
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Account Name</Form.Label>
            <Form.Control onChange={(e) => setAccountName(e.target.value)} type="text" placeholder="New Account Name" />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={() => {setShowPost(); manageNewAccount(list, accounts.value, accountName, postData)}}>
            Save
          </Button>
          <Button variant="secondary" onClick={setShowPost}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}

export default AccountPost