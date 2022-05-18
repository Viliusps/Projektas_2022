import React from 'react'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Pagination = ({ coinsPerPage, totalCoins, paginate}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container>
        <NavBar  bg="dark" variant="dark">
            <Nav className="pagination me-auto">
                {pageNumbers.map(number => (
                <Nav.Link  key={number} onClick={() => paginate(number)} href='#'>
                    {number}
                </Nav.Link>))}
            </Nav>
        </NavBar>
        </Container>
    )

}

export default Pagination