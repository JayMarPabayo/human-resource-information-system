import { Navbar, Nav, Container } from 'react-bootstrap';
// import { FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className='d-flex gap-2 align-items-center'>
          <img
              src={process.env.PUBLIC_URL + '/hris-logo.png'}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span className='h6 mt-2'>
              Human Resource Information System
            </span>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="#home">Employee Management</Nav.Link>
            <Nav.Link href="#features">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
} 

export default Header