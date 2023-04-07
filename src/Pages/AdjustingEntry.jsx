import Home from "./Home"
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import accountListApi from "../Utils/accountListApi";
import transactionPostApi from "../Utils/transactionPostApi";
import journalPostApi from "../Utils/journalPostApi";
import AccountPost from "../Components/AccountPost";
import accountPostApi from "../Utils/accountPostApi";


const AdjustingEntry = () => {

  const [accountList, setAccountList] = useState([])

  // DR
  const [accountOptionDr, setAccountOptionDr] = useState([{ index: Date.now(), amount: 0, position: 'dr' }])

  const updateAccountStateDr = (index, event) => {
    let accounts = [...accountOptionDr]
    accounts[index]['account'] = event.account
    setAccountOptionDr(accounts)
  }

  const insertAccountStateDr = () => {
    let accounts = [...accountOptionDr]
    accounts[accounts.length] = { index: Date.now(), amount: 0, position: 'dr' }
    setAccountOptionDr(accounts)
  }

  const deleteAccountStateDr = (index) => {
    let accounts = [...accountOptionDr]
    accounts.splice(index, 1)
    setAccountOptionDr(accounts)
  }

  const updateAmountDr = (event, index) => {
    let accounts = [...accountOptionDr]
    accounts[index]['amount'] = parseInt(event.target.value)
    setAccountOptionDr(accounts)
  }

  const getTotalDr = () => {
    const total = accountOptionDr.reduce((totals, total) => totals + total.amount, 0)
    if (isNaN(total)) {
      return 0
    }
    if (!isNaN(total)) {
      return `Rp ${total.toLocaleString('id')}`
    }
  }


  // CR
  const [accountOptionCr, setAccountOptionCr] = useState([{ index: Date.now(), amount: 0, position: 'cr' }])

  const updateAccountStateCr = (index, event) => {
    let accounts = [...accountOptionCr]
    accounts[index]['account'] = event.account
    setAccountOptionCr(accounts)
  }

  const insertAccountStateCr = () => {
    let accounts = [...accountOptionCr]
    accounts[accounts.length] = {index: Date.now(), amount: 0, position: 'cr'}
    setAccountOptionCr(accounts)
  }

  const deleteAccountStateCr = (index) => {
    let accounts = [...accountOptionCr]
    accounts.splice(index, 1)
    setAccountOptionCr(accounts)
  }

  const updateAmountCr = (event, index) => {
    let accounts = [...accountOptionCr]
    accounts[index]['amount'] = parseInt(event.target.value)
    setAccountOptionCr(accounts)
  }

  const getTotalCr = () => {
    const total = accountOptionCr.reduce((totals, total) => totals + total.amount, 0)
    if (isNaN(total)) {
      return 0
    }
    if (!isNaN(total)) {
      return `Rp ${total.toLocaleString('id')}`
    }
  }

  // GENERAL

  const [transaction, setTransaction] = useState({})

  const handleTransaction = (event, param) => {
    let data = transaction
    data['type'] = 'PENYESUAIAN'
    data[param] = event.target.value
    setTransaction(data)
  }


  const toDeleteAccount = () => {
    setAccountOptionDr([{index: Date.now(), amount: 0, position: 'dr'}])
    setAccountOptionCr([{index: Date.now(), amount: 0, position: 'cr'}])
  }


  const postDataJournal = (data) => {
    for (const index in accountOptionDr) {
      let journal = accountOptionDr[index]
      delete journal['index']
      journal['transaction'] = data.id
      journalPostApi(
        journal,
        (data) => console.log(data),
        (data) => console.log("failed", data),
        () => {} 
      )
    }
    for (const index in accountOptionCr) {
      let journal = accountOptionCr[index]
      delete journal['index']
      journal['transaction'] = data.id
      journalPostApi(
        journal,
        (data) => console.log(data),
        (data) => console.log("failed", data),
        () => {} 
      )
    }
  }


  const postDataTransaction = () => {
    transactionPostApi(
      transaction,
      (data) => postDataJournal(data),
      (data) => console.log("failed", data),
      () => {}
    )
    toDeleteAccount()
  }

  useEffect(() => { accountListApi((data) => setAccountList(data)) }, [])

  const formatedAccounts = () => {
    let newAccountList = []
    accountList.map(i => (
      newAccountList.push({
        value: i.id,
        account: i.id,
        label: `${i.c1}-${i.c2}${i.c3}${i.c4}${i.c5}${i.c6} - ${i.account.toUpperCase()}`
      })
    ))
    return newAccountList
  }

  // POST ITEM
  const [post, setPost] = useState([])
  const [showPost, setShowPost] = useState(false)
  const handleClosePost = () => setShowPost(false)
  const handleShowPost = () => setShowPost(true)
  
  const postData = (data) => {
      accountPostApi(data, (data) => setPost(data), (text) => console.log("Error: ", text), () => { accountListApi((data) => setAccountList(data)) })
  }
  
  return (
    <div>
      <Home />
      <AccountPost handleClosePost={handleClosePost} showPost={showPost} postData={postData} list={accountList}/>
      <div style={{ width: "80%", margin: "auto", marginTop: "15px", }}>
        <Row>
          <Col>
            <h4>Input Journal - Adjusting Entry</h4>
          </Col>
          <Col>
            <Button onClick={() => postDataTransaction()} style={{ marginLeft: "10px" }} className="float-end" variant="warning">Post Transaction</Button>
            <Button onClick={() => handleShowPost()} style={{ marginLeft: "10px" }} className="float-end" variant="primary">Add Account</Button>
          </Col>
        </Row>


        <div style={{ width: "100%", float: "top", marginTop: "20px", marginBottom: "10px", padding: "20px", boxShadow: "5px 5px 20px #cccccccc" }}>
          <Row>
            <Col>
              <Form.Label>Date</Form.Label>
              <Form.Control id="transaction date" onChange={(event) => handleTransaction(event, 'date')} type="date" size="md" placeholder="Type" />
            </Col>
            <Col>
              <Form.Label>Type</Form.Label>
              <Form.Control id="transaction type" type="text" size="md" value={'PENYESUAIAN'} disabled readOnly/>
            </Col>
            <Col>
              <Form.Label>Desciption</Form.Label>
              <Form.Control id="transaction desc" onChange={(event) => handleTransaction(event, 'desc')} type="text" size="md" placeholder="Desciption" />
            </Col>
          </Row>
        </div>


        <div style={{ width: "49.5%", float: "left", padding: "10px", boxShadow: "5px 5px 20px #cccccccc" }}>
          <Row>
            <Col style={{ textAlign: "center", marginTop: "10px" }} ><h5 >Debit</h5></Col>
          </Row>

          <hr />

          {accountOptionDr.map((data, index) => (
            <div key={data.index}>
              {
                <Row style={{ marginTop: "10px" }}>
                  <Col xs={7}><Select maxMenuHeight={150} options={formatedAccounts()} onChange={(event) => updateAccountStateDr(index, event)} defaultValue={data.event} /></Col>
                  <Col xs={3}><Form.Control onChange={(event) => updateAmountDr(event, index)} type="number" placeholder="Nominal" className="text-end" /></Col>
                  <Col><Button onClick={() => deleteAccountStateDr(index)} variant="danger" >Del</Button></Col>
                </Row>
              }
            </div>
          ))}

          <hr />

          <Row style={{ marginTop: "5px" }}>
            <Col xs={7} style={{ textAlign: "center" }} ><h5 >Total</h5></Col>
            <Col xs={3} ><Form.Control value={getTotalDr()} className="text-end" readOnly /></Col>
            <Col><Button onClick={() => insertAccountStateDr()} variant="primary" >Add</Button></Col>
          </Row>
        </div>


        <div style={{ width: "49.5%", float: "right", padding: "10px", boxShadow: "5px 5px 20px #cccccccc", alignItems: "center" }}>

          <Row>
            <Col style={{ textAlign: "center", marginTop: "10px" }} ><h5 >Credit</h5></Col>
          </Row>

          <hr />

          {accountOptionCr.map((data, index) => (
            <div key={data.index}>
                <Row style={{ marginTop: "10px" }}>
                  <Col xs={7}><Select maxMenuHeight={150} options={formatedAccounts()} onChange={(event) => updateAccountStateCr(index, event)} defaultValue={data.event} /></Col>
                  <Col xs={3}><Form.Control onChange={(event) => updateAmountCr(event, index)} type="number" placeholder="Nominal" className="text-end" /></Col>
                  <Col><Button onClick={() => deleteAccountStateCr(index)} variant="danger" >Del</Button></Col>
                </Row>
            </div>
          ))}

          <hr />

          <Row style={{ marginTop: "5px" }}>
            <Col xs={7} style={{ textAlign: "center" }} ><h5 >Total</h5></Col>
            <Col xs={3} ><Form.Control value={getTotalCr()} className="text-end" readOnly /></Col>
            <Col><Button onClick={() => insertAccountStateCr()} variant="primary" >Add</Button></Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default AdjustingEntry