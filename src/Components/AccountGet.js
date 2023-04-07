import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import accountPutApi from '../Utils/accountPutApi';

function AccountGet({setShowGet, showGet, get, setGet, setPost}) {

  const getValue = (event, param) => {
    setGet(prev => ({ ...prev, [param]: event.target.value }));
  };

  const handleClearAccount = () => {
    setGet({})
  }

  const putAccount = () => { 
    accountPutApi(get)
    .then((data) => setPost(data))
    .catch(() => {})
  } 


  return (
    <div>
      <Modal show={showGet} onHide={setShowGet} backdrop="static">
        <Modal.Header >
          <Modal.Title>{get.account?.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Code 1</Form.Label>
            <Form.Control onChange={(event) => getValue(event, 'c1')} defaultValue={get.c1} size='sm' readOnly></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Code 2</Form.Label>
            <Form.Control onChange={(event) => getValue(event, 'c2')} defaultValue={get.c2} size='sm' readOnly></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Code 3</Form.Label>
            <Form.Control onChange={(event) => getValue(event, 'c3')} defaultValue={get.c3} size='sm' readOnly></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Code 4</Form.Label>
            <Form.Control onChange={(event) => getValue(event, 'c4')} defaultValue={get.c4} size='sm' readOnly></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Code 5</Form.Label>
            <Form.Control onChange={(event) => getValue(event, 'c5')} defaultValue={get.c5} size='sm' readOnly></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Code 6</Form.Label>
            <Form.Control onChange={(event) => getValue(event, 'c6')} defaultValue={get.c6} size='sm' readOnly></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Account</Form.Label>
            <Form.Control onChange={(event) => getValue(event, 'account')} defaultValue={get.account} size='sm' ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Default Position</Form.Label>
            <Form.Control onChange={(event) => getValue(event, 'dp')} defaultValue={get.dp} size='sm' readOnly></Form.Control>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>

          <Button variant="primary" onClick={() => {putAccount(); handleClearAccount(); setShowGet();}}>
            Edit & Save
          </Button>
          <Button variant="secondary" onClick={() => {handleClearAccount(); setShowGet();}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccountGet