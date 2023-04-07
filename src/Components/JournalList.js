import Table from 'react-bootstrap/Table';

function JournalList({ handleShowGet, list, getData }) {
  return (
    <div style={{marginTop:"20px", height:"300px", overflowY:"auto"}}>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Transaction Id</th>
            <th>Account Id</th>
            <th>Position</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {list.map((i, index) => (
            <tr onClick={() => {handleShowGet(); getData(`http://127.0.0.1:8000/journals/${i.id}/`);}} key={index + 1}>
              <td>{i.id}</td>
              <td>{i.transaction}</td>
              <td>{i.account}</td>
              <td>{i.position === 'dr'? "DEBIT" : "CREDIT"}</td>
              <td>{i.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

  );
}

export default JournalList;