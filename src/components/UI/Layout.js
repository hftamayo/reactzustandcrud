import { Container, Navbar, Nav } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Cake Store</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/view-cake">Catalog</Nav.Link>
            <Nav.Link href="#customize">Customize</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
