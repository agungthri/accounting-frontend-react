import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import transactionPutApi from '../Utils/transactionPutApi';
import { useEffect } from 'react';
import JournalPane from './JournalPane';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import TransactionPane from './TransactionPane';
import randomString from '../Utils/randomString';
import journalPutApi from '../Utils/journalPutApi';
import transactionDelApi from '../Utils/transactionDelApi';
import transactionJournalPostApi from '../Utils/transactionJournalPostApi';



function TransactionGet({setShowGet, showGet, get, setSuccess, accountList}) {
  
  const [accountOptionDr, setAccountOptionDr] = useState([{index:randomString(4)}])
  const [accountOptionCr, setAccountOptionCr] = useState([{index:randomString(4)}])
  const [transactionGet, setTransactionGet] = useState()
  const [transactionPut, setTransactionPut] = useState()

  const toPositionOption = (position, setAccountOption) => {
    const acc = get.journal_transaction?.filter(journal => journal.position === position)
      .map(item => ({ ...item, index: randomString(4) }));
    setAccountOption(acc || []);
  };

  const toTransactionGet = () => {
    let data = get
    delete data['journal_transaction']
    setTransactionGet(data)
  }

  const handleClearTransaction = () => {
    setTransactionGet({})
  }
  
  const toTransactionPut = () => {
    let id = transactionGet.id
    transactionDelApi(id, () => {})
    let newJournals = [...accountOptionDr, ...accountOptionCr]
    let newTransaction = transactionGet
    const modifiedNewJournals = newJournals?.map(({ index, ...item }) => item);

    newTransaction['journal_transaction'] = modifiedNewJournals
    transactionJournalPostApi(newTransaction)
    .then((data) => setTransactionPut(data))
    .catch((data) => console.log(data))
  }

  useEffect(() => {
    if ( Object.keys(get).length !== 0 ) {
      toPositionOption('dr', setAccountOptionDr)
      toPositionOption('cr', setAccountOptionCr)
      toTransactionGet()
    }
  }, [get])

  useEffect(() => {
    if (transactionPut) {
      setSuccess(randomString(4))
      setAccountOptionDr([{index:randomString(4)}])
      setAccountOptionCr([{index:randomString(4)}])
    }
  }, [transactionPut])


  return (
    <div>
      <Modal show={showGet} onHide={setShowGet} backdrop="static" size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{"Transaction"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionPane transaction={transactionGet} setTransaction={setTransactionGet}/>
          <Row style={{padding:"20px"}}>
          <JournalPane
            accountOption={accountOptionDr}
            setAccountOption={setAccountOptionDr}
            position={'dr'}
            accountList={accountList}
            />
          </Row>
          <Row style={{padding:"20px"}}>
          <JournalPane
            accountOption={accountOptionCr}
            setAccountOption={setAccountOptionCr}
            position={'cr'}
            accountList={accountList}
            />
          </Row>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {toTransactionPut(); handleClearTransaction(); setShowGet()}}>
            Edit & Save
          </Button>
          <Button variant="secondary" onClick={() => {handleClearTransaction(); setShowGet()}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TransactionGet