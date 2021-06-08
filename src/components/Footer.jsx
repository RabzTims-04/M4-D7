import { Navbar, Container, Col } from 'react-bootstrap'

const Footer =()=>{
    return(
        <Navbar fixed="bottom" expand="lg" variant='dark' className="footer">
            <Container>
               <Col>
                 &copy; StriveSchool Bookstore Hooks Model
               </Col> 
            </Container>
        </Navbar>
    )
}

export default Footer