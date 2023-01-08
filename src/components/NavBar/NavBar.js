import { logOut } from '../../utilities/users-service'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavBar (props) {
  let loggedOut = false
  
  const handleLogout = () => {
    props.setUser(null)
    logOut()
    loggedOut = true
  }

  return (
    <div className='main-nav'>
      <Navbar bg="primary" expand="false" className="mb-3">
        <Container fluid>
          <Navbar.Brand>{props.page}</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand-expand`}
            placement="end"
            bg="primary"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-expand`} >
                {props.user.name}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr style={{margin:0}}/>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/dashboard">My Dashboard</Nav.Link>
                <NavDropdown
                  title="My Accounts"
                  id={`offcanvasNavbarDropdown-expand-expand`}
                >
                  {/* MAP FUNCTION HERE FOR EACH INDIVIDUAL ITEM */}
                  <NavDropdown.Item href={`/accounts/${''}`}>Account Name</NavDropdown.Item>
                  <NavDropdown.Item href="/accounts/new">Add a new account</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/options">User Options</Nav.Link>
                <Nav.Link href="/" onClick={handleLogout}><span className="logout">Logout</span></Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}
