import Container from 'react-bootstrap/Container'

export default function AuthLayout({ children }) {
    return(
        <div className='bg-light pt-5 pb-4' style={{ height: '100vh' }}>
            <Container>
                {children}
            </Container>
        </div>
    )
}