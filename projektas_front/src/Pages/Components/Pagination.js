import React from 'react'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Pagination = ({ coinsPerPage, totalCoins, paginate, currentPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pageNumbers.push(i);
    }

    console.log(currentPage);

    return (
        <Container>
        <NavBar bg="dark" variant="dark" className="removeIfContinuous">
            <Nav className="pagination me-auto">
                {pageNumbers.map((number) => {
                        if (currentPage === number) {
                            return (<Nav.Link className="current-page" key={number} onClick={() => paginate(number)}><a className="current-page">{number}</a>
                            </Nav.Link>)
                        }
                        else {
                            return (<Nav.Link  key={number} onClick={() => paginate(number)}>
                            {number}
                            </Nav.Link>)
                        }
                    }
                )}
            </Nav>
        </NavBar>
        </Container>
    )

}

export default Pagination