import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { FaBoxes } from 'react-icons/fa';

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
            <Container>
                <Navbar.Brand href="#home" className="fw-bold">
                    <FaBoxes className="me-2" /> Dashboard Inventaris Gudang
                </Navbar.Brand>
                <Navbar.Text className="text-light">
                    Logged in as: <strong>Yuliana Putri (2211501030)</strong>
                </Navbar.Text>
            </Container>
        </Navbar>
    );
}