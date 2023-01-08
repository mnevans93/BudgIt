import { useEffect } from 'react'
import { logOut } from '../../utilities/users-service'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavBar ( {user, setUser, page, link, setLink, navigate, handleClick } ) {
    useEffect(() => {
      navigate(link)
    }, [link])
  
  const handleLogout = (e) => {
    e.preventDefault()
    logOut()
    setUser(null)
    setLink('/welcome')
  }

  return (
    <div className='main-nav'>
      <Navbar bg="primary" expand="false" className="mb-3">
        <Container fluid>
          <Navbar.Brand>{page}</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand-expand`}
            placement="end"
            bg="primary"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-expand`} >
                {user.name}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr />
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/dashboard" onClick={(e) => handleClick(e, '/dashboard')} >My Dashboard</Nav.Link>
                <NavDropdown
                  title="My Accounts"
                  id={`offcanvasNavbarDropdown-expand-expand`}
                >
                  {/* MAP FUNCTION HERE FOR EACH INDIVIDUAL ITEM */}
                  <NavDropdown.Item href={`/accounts/${''}`} onClick={(e) => handleClick(e, `/accounts/${''}`)} >Account Name</NavDropdown.Item>
                  <NavDropdown.Item href="/accounts/new" onClick={(e) => handleClick(e, '/accounts/new')} >Add a new account</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/options" onClick={(e) => handleClick(e, '/options')} >User Options</Nav.Link>
                <Nav.Link href="/welcome" onClick={(e) => handleLogout(e)} ><span className="logout">Logout</span></Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}
