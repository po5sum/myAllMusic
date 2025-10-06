import { Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'

export default function MyNavBar(){

    const links = [
        {
            to: "albums",
            title: "Albums Page"
        },
        {
            to: "artists",
            title: "Artists Page"
        }
    ]

    return(
        <Navbar bg="success" data-bs-theme="dark">
           <Container>
                <LinkContainer to="/" style={{cursor: 'pointer'}}>
                    <Navbar.Brand className="fs-2">
                        Home
                    </Navbar.Brand>
                </LinkContainer> 
                <Nav className="me-auto fs-4">
                    {links.map((link) => (
                        <LinkContainer to={`/${link.to}`} key={link.to}>
                            <Nav.Link>{link.title}</Nav.Link>
                        </LinkContainer>
                    ))}
                </Nav>
           </Container>
        </Navbar>
    );

}