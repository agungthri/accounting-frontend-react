import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { Form } from "react-bootstrap"

const TransactionPane = ({transaction, setTransaction}) => {

  const handleTransaction = (event, param) => {
    setTransaction(prev => ({ ...prev, [param]: event.target.value }));
  };
  

    return (
      <Row style={{ margin:"auto", border:"ridge", padding:"10px", marginTop:"10px"}}>
        <Col>
          <Form.Label>Date</Form.Label>
          <Form.Control id="transaction date" onChange={(event) => handleTransaction(event, 'date')} defaultValue={transaction?.date} type="date" size="md" placeholder="Type" />
        </Col>
        <Col>
          <Form.Label>Type</Form.Label>
          <Form.Control id="transaction type" onChange={(event) => handleTransaction(event, 'type')} defaultValue={transaction?.type} type="text" size="md" placeholder="Type" />
        </Col>
        <Col>
          <Form.Label>Desciption</Form.Label>
          <Form.Control id="transaction desc" onChange={(event) => handleTransaction(event, 'desc')} defaultValue={transaction?.desc} type="text" size="md" placeholder="Desciption" />
        </Col>
      </Row>
    )
}

export default TransactionPane