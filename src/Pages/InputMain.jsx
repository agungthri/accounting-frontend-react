import Home from "./Home"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import accountListApi from "../Utils/accountListApi";
import AccountPost from "../Components/AccountPost";
import transactionListApi from "../Utils/transactionListApi";
import JournalPane from "../Components/JournalPane";
import TransactionPane from "../Components/TransactionPane";
import TransactionList from "../Components/TransactionList";
import TransactionGet from "../Components/TransactionGet";
import randomString from "../Utils/randomString";
import transactionJournalPostApi from "../Utils/transactionJournalPostApi";


const InputMain = () => {
  
  // ACCOUNT OPTION
  const [accountList, setAccountList] = useState([])
  const [accountOptionDr, setAccountOptionDr] = useState([{ index: randomString(4), amount: 0, position: 'dr' }])
  const [accountOptionCr, setAccountOptionCr] = useState([{ index: randomString(4), amount: 0, position: 'cr' }])

  // ACCOUNT POST ITEM
  const [accountModalPost, setAccountModalPost] = useState([])
  const [accountModalShow, setAccountModalShow] = useState(false)

  // TRANSACTION MAIN
  const [transaction, setTransaction] = useState({})
  const [transactionList, setTransactionList] = useState([])
  const [transactionPost, setTransactionPost] = useState('')

  // TRANSACTION MODAL
  const [transactionModalShow, setTransactionModalShow] = useState(false);
  const [transactionModalGet, setTransactionModalGet] = useState({});
  const [transactionModalSuccess, setTransactionModalSuccess] = useState()
  
  const postJournalTransaction = () => {
    let newJournals = [...accountOptionDr, ...accountOptionCr]
    let newTransaction = transaction
    const modifiedNewJournals = newJournals?.map(({ index, ...rest }) => rest);

    newTransaction['journal_transaction'] = modifiedNewJournals
    transactionJournalPostApi(newTransaction)
    .then((data) => setTransactionPost(data))
    .catch((data) => console.log(data))
  }
   
  useEffect(() => {
    if (transactionModalSuccess){
      transactionListApi()
      .then((data) => setTransactionList(data))
    }
  }, [transactionModalSuccess])


  useEffect(() => {
    if (accountModalPost){
      accountListApi()
      .then((data) => setAccountList(data))
    }
  }, [accountModalPost])

  useEffect(() => {
    if (transactionPost){
      transactionListApi()
      .then((data) => setTransactionList(data))

      setAccountOptionDr([{index: randomString(4), amount: 0, position: 'dr'}])
      setAccountOptionCr([{index: randomString(4), amount: 0, position: 'cr'}])
    }
  }, [transactionPost])


  return (
    <div>
        <Home/>
        <TransactionGet 
          setShowGet={() => setTransactionModalShow(false)} 
          showGet={transactionModalShow}
          get={transactionModalGet}
          setGet={setTransactionModalGet}
          setSuccess={setTransactionModalSuccess}
          accountList={accountList}
          />

        <AccountPost 
          setShowPost={() => setAccountModalShow(false)}
          showPost={accountModalShow} 
          setPost={setAccountModalPost} 
          list={accountList}
          />

        <Row style={{width:"95%", margin:"auto", boxShadow: "5px 5px 20px #cccccccc", padding:"10px", marginTop:'20px'}} >
          <Col>
            <h4>Input Transaction</h4>
          </Col>
          <Col>
            <Button onClick={() => postJournalTransaction()} style={{ marginLeft: "10px" }} className="float-end" variant="warning">Post Transaction</Button>
            <Button onClick={() => setAccountModalShow(true)} style={{ marginLeft: "10px" }} className="float-end" variant="primary">Add Account</Button>
          </Col>
        </Row>
        
        <Row style={{width:"95%", margin:"auto", boxShadow: "5px 5px 20px #cccccccc", padding:"10px", marginTop:'10px'}}>
          <Col xs={4}>
            <p><b>Transaction List</b></p>
            <TransactionList 
              setShowGet={() => setTransactionModalShow(true)} 
              list={transactionList} setList={setTransactionList} 
              setGet={setTransactionModalGet}/>
          </Col>
          <Col>
            <p><b>Input Journal</b></p>
            <TransactionPane transaction={transaction} setTransaction={setTransaction}/>
            <Row style={{ margin:"auto", border:"ridge", padding:"10px", marginTop:"10px"}}>
              <Col>
                <Row >
                  <JournalPane
                    accountOption={accountOptionDr}
                    setAccountOption={setAccountOptionDr}
                    position={'dr'}
                    accountList={accountList}
                    />
                </Row>
              </Col>
              <Col >
                <Row>
                  <JournalPane
                      accountOption={accountOptionCr}
                      setAccountOption={setAccountOptionCr}
                      position={'cr'}
                      accountList={accountList}
                      />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
}

export default InputMain