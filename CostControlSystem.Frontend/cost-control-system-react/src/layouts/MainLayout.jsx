import { TheNavbar } from 'components'
import Container from 'react-bootstrap/Container'
import { FloatingActionButtonAddRecord } from 'components/FloatingActionButtonAddRecord'

export default function MainLayout({ children }) {
    return(
        <>
            <TheNavbar />
            <FloatingActionButtonAddRecord />
            <Container>
                {children}
            </Container>
        </>
    )
}