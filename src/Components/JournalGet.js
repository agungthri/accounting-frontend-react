import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function JournalGet({ handleCloseGet, showGet, get}) {

  return (
    <>
      <Modal show={showGet} onHide={handleCloseGet} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{"Journal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <p><b> ID :</b> {get.id}</p>
          <p><b> Transaction :</b> {get.transaction}</p>
          <p><b> Account : </b> {get.account}</p>
          <p><b> Position : </b> {get.position}</p>
          <p><b> Amount : </b> {get.amount}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseGet}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default JournalGet