import { Navbar, Nav, Container } from 'react-bootstrap';
import { IoLogOutSharp } from "react-icons/io5";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className='row align-items-center'>
          <img
              src={process.env.PUBLIC_URL + '/hris-logo.png'}
              width="24"
              height="24"
              className="col"
              alt="React Bootstrap logo"
            />
            <span className='col px-0 fw-medium' style={{ fontSize: 'medium' }} >
              Human Resource Information System
            </span>
          </Navbar.Brand>
          <Nav style={{ fontSize: 'medium' }}>
            <Nav.Link href="#home">Employee Management</Nav.Link>
            <Nav.Link href="#features" title='Log out'><IoLogOutSharp style={{ fontSize: 'x-large' }}/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
} 

export default Header