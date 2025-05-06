import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import LoginButton from './LoginButton';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setLoggedInUser(user);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <span style={{ color: '#e74c3c' }}>Food</span>Blog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="px-3">Home</Nav.Link>
              <Nav.Link href="/new-post" className="px-3">New Post</Nav.Link>
              {loggedInUser && (
                <Nav.Link href="/my-recipes" className="px-3">My Recipes</Nav.Link>
              )}
            </Nav>
            <div className="d-flex align-items-center">
              <Form onSubmit={handleSearch} className="position-relative me-3">
                <Form.Control
                  type="text"
                  placeholder="Search recipes..."
                  className="ps-4"
                  style={{ width: '250px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch 
                  className="position-absolute" 
                  style={{ 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#6c757d'
                  }} 
                />
              </Form>
              <LoginButton />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;