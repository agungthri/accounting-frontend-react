import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import accountListApi from "../Utils/accountListApi";
import detailApi from '../Utils/detailApi';

function AccountList({setShowGet, list, setList, setGet}) {

  const getData = (url) => {
    detailApi(url)
      .then((data) => setGet(data))
      .catch((data) => console.log(data))
  }

  useEffect(() => {
        accountListApi()
        .then((data) => setList(data))
        .catch((data) => console.log(data));
  }, [])

  return (
    <div style={{marginTop:"20px", height:"300px", overflowY:"auto", boxShadow: "0px 0px 10px 10px #cccccccc inset"}}>
      <Table>
        <thead >
          <tr>
            <th>ID</th>
            <th>CODE</th>
            <th>DEFAULT POS</th>
            <th>ACCOUNT</th>
          </tr>
        </thead>
        <tbody>
            {list.map((i, index) => (
              <tr onClick={() => {setShowGet(); getData(`http://127.0.0.1:8000/accounts/${i.id}/`);}} key={index + 1}>
                <td>{index + 1}</td>
                <td>{i.c1}-{i.c2}{i.c3}{i.c4}{i.c5}{i.c6}</td>
                <td>{i.dp === 'dr' ? 'DEBIT':'CREDIT'}</td>
                <td>{i.account.toUpperCase()}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>

  );
}

export default AccountList;