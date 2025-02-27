import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccessDenied: React.FC = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Row>
                <Col>
                    <Card className="text-center shadow" style={{ borderRadius: '10px' }}>
                        <Card.Body>
                            <FaLock className="text-danger" style={{ fontSize: '48px' }} />
                            <Card.Title className="mt-3">Access Denied</Card.Title>
                            <Card.Text>
                                You do not have permission to view this page.
                                <br />
                                If you believe this is an error, please contact your administrator.
                            </Card.Text>
                            <Link to="/dashboard">
                                <Button variant="primary">Go Back to Home</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AccessDenied;