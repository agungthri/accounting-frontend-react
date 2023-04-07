import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import detailApi from '../Utils/detailApi';
import transactionListApi from '../Utils/transactionListApi';
import transactionDelApi from '../Utils/transactionDelApi';




function TransactionList({setShowGet, list, setList, setGet}) {

  const [del, setDel] = useState()


  const handleDel = (id) => {
    transactionDelApi(id)
    .then(() => setDel(id))
  }

  const getData = (url) => {
    detailApi(url)
    .then((data) => setGet(data))
    .catch((text) => console.log("Error: ", text))
  }

  const onClick = (id) => {
    setShowGet()
    getData(`http://127.0.0.1:8000/transaction-journal/${id}/`)
  }

  useEffect(() => {
    transactionListApi()
    .then((data) => setList(data))
    .catch((data) => console.log("Error: ", data))
  }, [])

  useEffect(() => {
    if(del){
      transactionListApi()
      .then((data) => setList(data))
      .catch((data) => console.log("Error: ", data))
    }
  }, [del])

  return (
    <div style={{marginTop:"20px", height:"400px", overflowY:"auto", boxShadow: "0px 0px 10px 10px #cccccccc inset"}}>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((i, index) => (
            <tr key={index + 1}>
              <td onClick={() => onClick(i.id)} >{i.id}</td>
              <td onClick={() => onClick(i.id)} >{i.date}</td>
              <td onClick={() => onClick(i.id)} >{i.type.toUpperCase()}</td>
              <td onClick={() => onClick(i.id)} >{i.desc.toUpperCase()}</td>
              <td onClick={() => handleDel(i.id)} ><button>Del</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

  );
}

export default TransactionList;