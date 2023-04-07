// Report2 = Trial Balance
import Home from "./Home"
import reportApi from "../Utils/reportApi"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"


const Report2 = () => {
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

    const positionAccumulator = (data, param) => {
      return data?.filter(item => item.account.dp === param)
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

    const getCode = (data, param) => {
      const account = data?.find(item => item.account.account === param)?.account;
      if (!account) {
        return "";
      }
      const { c1, c2, c3, c4, c5, c6 } = account;
      return `${c1}-${c2}${c3}${c4}${c5}${c6}`;
    };
    

    const uniqueData = [...new Set(sortedData?.map(item => item.account.account))]

    useEffect(() => {
      reportApi()
      .then((data) => setData(data))
      .catch(() => {})
    }, [])

    return (
        <div>
          <Home/>
          <div style={{width: "800px", margin: "auto", marginTop: "20px", marginBottom: "50px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em"}}>
            <Table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Account</th>
                  <th>Debit</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                {uniqueData?.map((item1, index) => (
                  sortedData?.filter(item => item.account.account === item1)[0].account.dp === 'dr' ? 
                  <tr key={index}>
                    <td>{getCode(data, item1)}</td>
                    <td>{item1}</td>
                    <td style={{textAlign:'right'}} >{`Rp ${accountAccumulator(sortedData, item1).toLocaleString('id')}`}</td>
                    <td></td>
                  </tr>
                  :
                  <tr key={index}>
                    <td>{getCode(data, item1)}</td>
                    <td style={{textIndent:'20px'}} >{item1}</td>
                    <td></td>
                    <td style={{textAlign:'right'}} >{`Rp ${accountAccumulator(sortedData, item1).toLocaleString('id')}`}</td>
                  </tr>
                ))}
                  <tr>
                    <td style={{textAlign:'center'}} colSpan={2} >Total : </td>
                    <td style={{textAlign:'right'}} >{`Rp ${positionAccumulator(data, 'dr')?.toLocaleString('id')}`}</td>
                    <td style={{textAlign:'right'}} >{`Rp ${positionAccumulator(data, 'cr')?.toLocaleString('id')}`}</td>
                  </tr>
              </tbody>
            </Table>
          </div>
        </div>
    )
}

export default Report2