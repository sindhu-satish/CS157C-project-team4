import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import LoginButton from './LoginButton';

function NavigationBar() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <Navbar >
        <Container>
          <Navbar.Brand href="/">Food Blog</Navbar.Brand>
          <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/new-post">New Post</Nav.Link>
          </Nav>
        </Container>
        <div className="d-flex align-items-center">
          <Form style={{paddingRight: '10px'}}>
                <Form.Control
                  type="text"
                  placeholder="Search"
                />
          </Form>
          <LoginButton />
        </div>
      </Navbar>
    </>
  );
}

export default NavigationBar;