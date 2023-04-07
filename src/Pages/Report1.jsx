// Report1.jsx = Report Ledger
import { useEffect, useState } from 'react';
import reportApi from '../Utils/reportApi';
import Home from './Home';
import { Table } from 'react-bootstrap';


const Report1 = () => {
  const [data, setData] = useState()

  
  const sortedData = data?.sort((a, b) => {
    for (let i = 1; i <= 6; i++) {
      const cmp = a.account[`c${i}`] - b.account[`c${i}`];
      if (cmp !== 0) {
        return cmp;
      }
    }
    return 0;
  });
  
  
  const accountAccumulator = (data, param) => {
    return data?.filter(item => item.account.account === param)
    .reduce((acc, item) => {
      if (item.account.dp === 'dr'){
        if (item.position === 'dr'){return acc + item.amount}
        if (item.position === 'cr'){return acc - item.amount}
      }
      if (item.account.dp === 'cr'){
          if (item.position === 'dr'){return acc - item.amount}
          if (item.position === 'cr'){return acc + item.amount}
        }
      }, 0)
  }
  
  useEffect(() => {
    reportApi()
    .then((data) => setData(data))
    .catch(() => {})
  }, [])
  
  const uniqueData = [...new Set(sortedData?.map(item => item.account.account))]
  
    return (
      <div>
        <Home/>
        {uniqueData?.map((item1, index) => (
          <div key={index} style={{width: "800px", margin: "auto", marginTop: "20px", marginBottom: "50px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em"}}>
            <h5>{item1.toUpperCase()}</h5>
            <Table striped bordered size="sm" responsive="sm" style={{marginTop:"20px"}}>
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>TYPE</th>
                  <th>ACCOUNT</th>
                  <th>DEBIT</th>
                  <th>CREDIT</th>
                </tr>
              </thead>
              <tbody>
                {sortedData?.filter(item2 => item1 === item2.account.account)
                .map((item3, index) => (
                  <tr key={index}>
                    <td>{item3.transaction.date}</td>
                    <td>{item3.transaction.type}</td>
                    <td>{item3.account.account}</td>
                    {item3.position === 'dr' ? 
                    <>
                      <td style={{textAlign:'right'}}>
                        {`Rp ${item3.amount.toLocaleString('id')}`}
                        </td><td>
                      </td>
                    </>
                     : 
                    <>
                    <td></td>
                      <td style={{textAlign:'right'}}>
                        {`Rp ${item3.amount.toLocaleString('id')}`}
                      </td>
                    </>}
                  </tr>
                ))}
                  <tr>
                    {sortedData?.filter(item => item.account.account === item1)[0].account.dp === 'dr' ? 
                      <>
                        <td colSpan={3} style={{textAlign:'center'}} >Total</td>
                        <td style={{textAlign:'right'}}>{`Rp ${accountAccumulator(sortedData, item1).toLocaleString('id')}`}</td>
                        <td>  </td>
                      </>
                      :
                      <>
                        <td colSpan={3} style={{textAlign:'center'}} >Total</td>
                        <td>  </td>
                        <td style={{textAlign:'right'}}>{`Rp ${accountAccumulator(sortedData, item1).toLocaleString('id')}`}</td>
                      </>
                      }
                  </tr>
              </tbody>
              </Table>
          </div>
        ))}
      </div>
    )
}

export default Report1