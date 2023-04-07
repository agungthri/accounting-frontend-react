import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate()
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/")} ><h5>Business Management System</h5></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link onClick={()=>navigate("/input-main/")} >Input Journal</Nav.Link>
            <Nav.Link onClick={()=>navigate("/input-main/adjusting-entry/")} >Adjusting Entry</Nav.Link>

            <NavDropdown title="Master Data" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=>navigate("/accounts/")} >Accounts</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate("/transactions/")} >Transactions</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate("/journals/")} >Journals</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Report" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=>navigate("/report1/")} >Ledger</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate("/report2/")} >Trial Balance</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate("/report3/")} >Test</NavDropdown.Item>
            </NavDropdown>



          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Home;