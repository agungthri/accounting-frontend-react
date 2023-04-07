import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Select from 'react-select'
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import accountSelectFormat from "../Utils/accountSelectFormat";
import randomString from "../Utils/randomString";

const JournalPane = ({accountOption, setAccountOption, position, accountList}) => {

  const updateAccountState = (index, event) => {
    let accounts = [...accountOption]
    accounts[index]['account'] = event.account
    setAccountOption(accounts)
  }

  const insertAccountState = () => {
    let accounts = [...accountOption]
    accounts[accounts.length] = { index: randomString(4), amount: 0, position:position }
    setAccountOption(accounts)
  }

  const deleteAccountState = (index) => {
    let accounts = [...accountOption]
    accounts.splice(index, 1)
    setAccountOption(accounts)
  }

  const updateAmount = (event, index) => {
    let accounts = [...accountOption]
    accounts[index]['amount'] = parseInt(event.target.value)
    setAccountOption(accounts)
  }

  const option = accountSelectFormat(accountList)

  const getTotal = () => {
    const total = accountOption?.reduce((acc, cur) => acc + cur.amount, 0) || 0;
    return `Rp ${total.toLocaleString('id')}`;
  };
  

    return (
        <Col  >
        <p><b>{position === 'dr' ? 'Debit' : 'Credit'} Journal</b></p>
        {accountOption?.map((data, index) => (
          <div key={data.index}>
            <Row style={{ marginTop: "10px" }}>
              <Col xs={6}><Select maxMenuHeight={150} options={option} onChange={(event) => updateAccountState(index, event)} defaultValue={option.filter(item => item.account === data.account)} /></Col>
              <Col xs={4}><Form.Control onChange={(event) => updateAmount(event, index)} defaultValue={data.amount} type="number" placeholder="Nominal" className="text-end" /></Col>
              <Col><Button onClick={() => deleteAccountState(index)} variant="danger" >Del</Button></Col>
            </Row>
          </div>
          ))}
          <hr />
          <Row style={{ marginTop: "5px" }}>
            <Col xs={6} style={{ textAlign: "center" }} ><p><b>Total :</b></p></Col>
            <Col xs={4} ><Form.Control value={getTotal()} className="text-end" readOnly /></Col>
            <Col><Button onClick={() => insertAccountState()} variant="primary" >Add</Button></Col>
          </Row>
        </Col>
    )
}

export default JournalPane