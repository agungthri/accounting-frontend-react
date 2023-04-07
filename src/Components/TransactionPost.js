import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import transactionPostApi from '../Utils/transactionPostApi';


function TransactionPost({setShowPost, showPost, setPost}){

  const [transaction, setTransaction] = useState({})

  const handleTransactionDate = (event) => {
    const data = transaction
    data['date'] = event.target.value
    setTransaction(data)
  }
  
  const handleTransactionType = (event) => {
    const data = transaction
    data['type'] = event.target.value
    setTransaction(data)
  }
  
  const handleTransactionDesc = (event) => {
    const data = transaction
    data['desc'] = event.target.value
    setTransaction(data)
  }

  const postData = (data) => {
    transactionPostApi(data, (data) => setPost(data), (text)=>{console.log("Error: ", text)}, () => {})
}
  
  // const date = startDate.toISOString().split('T')[0]

  return (
    <>
      <Modal show={showPost} onHide={setShowPost}>
        <Modal.Header closeButton>
          <Modal.Title>{"Transaction"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Label style={{marginTop:"20px"}} >Date</Form.Label>
        <Form.Control onChange={(event) => handleTransactionDate(event)} type="date" placeholder="Date" />
        <Form.Label style={{marginTop:"20px"}} >Type</Form.Label>
        <Form.Control onChange={(event) => handleTransactionType(event)} type="text" placeholder="Type" />
        <Form.Label style={{marginTop:"20px"}} >Desc</Form.Label>
        <Form.Control onChange={(event) => handleTransactionDesc(event)} type="text" placeholder="Desc" />


        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={() => {setShowPost(); postData(transaction)}}>
            Save
          </Button>
          <Button variant="secondary" onClick={setShowPost}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TransactionPost