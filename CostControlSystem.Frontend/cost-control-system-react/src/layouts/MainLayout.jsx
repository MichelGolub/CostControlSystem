import Navbar from 'components/Navbar/Navbar'
import Container from 'react-bootstrap/Container'
import CreateRecordFloatingActionButton from 'features/records/CreateRecordFloatingActionButton'

export default function MainLayout({ children }) {
    return(
        <>
            <Navbar />
            <Container>
                {children}
                <CreateRecordFloatingActionButton />
            </Container>
        </>
    )
}