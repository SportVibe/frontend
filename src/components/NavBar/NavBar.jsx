import { Link, useLocation} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SearchBar from './SearchBar/SearchBar';
import Logo from'../../Images/Logo.jpg';


function NavBar() {
  const location = useLocation();
  return (
    <Navbar  className="w-100" expand="lg" bg="transparent" variant="light">
      <Navbar.Brand as={Link} to="/">
      <img
      src={Logo} 
      alt="Logo"
      width="200"
      height="40"
      className="d-inline-block align-text-top"
    />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      {(location.pathname === "/" || location.pathname === "/search" ) && 
      <SearchBar /> } 
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            HOME
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            ABOUT US
          </Nav.Link>
          <Nav.Link as={Link} to="/shoppingcart">
            🛒
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            👤
          </Nav.Link>
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;