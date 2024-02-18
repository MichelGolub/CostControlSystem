//import { TheNavbar } from 'components/TheNavbar'
import Container from 'react-bootstrap/Container'

export default function MainLayout({ children }) {
    return(
        <>
            <Container>
                {children}
            </Container>
        </>
    )
}