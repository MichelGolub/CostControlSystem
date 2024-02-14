import Navbar from 'components/Navbar/Navbar'
import Container from 'react-bootstrap/Container'

export default function MainLayout({ children }) {
    return(
        <>
            <Navbar />
            <Container>
                {children}
            </Container>
        </>
    )
}