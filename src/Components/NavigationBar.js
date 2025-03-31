import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavigationBar() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <Navbar >
        <Container>
          <Navbar.Brand href="/home">Food Blog</Navbar.Brand>
          <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/new-post">New Post</Nav.Link>
          </Nav>
        </Container>
        <Form style={{paddingRight: '10px'}}>
              <Form.Control
                type="text"
                placeholder="Search"
              />
        </Form>
      </Navbar>
    </>
  );
}

export default NavigationBar;