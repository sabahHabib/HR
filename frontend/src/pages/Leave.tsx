import React from 'react';
import { Button, Form, Container, Row, Col, Table, Card } from 'react-bootstrap';
import { useLeave } from '../hooks/useLeave';

const Leave: React.FC = () => {
  const { leaveData, leaves, error, handleChange, handleSubmit, handleDelete } = useLeave();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Card className="w-75 m-5">
        <Card.Body>

          <Form onSubmit={handleSubmit}>
            <Row className="m-3">
              <Col md={6}>
                <Form.Group controlId="from_date">
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="from_date"
                    value={leaveData.from_date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="to_date">
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="to_date"
                    value={leaveData.to_date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="leave_type">
                  <Form.Label>Leave Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="leave_type"
                    value={leaveData.leave_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Umrah">Umrah</option>
                    <option value="Medical">Medical</option>
                    <option value="Annual">Annual</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="leave_status">
                  <Form.Label>Leave Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="leave_status"
                    value={leaveData.leave_status}
                    onChange={handleChange}
                  >
                    <option value="">Select Leave Status</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Half Day">Half Day</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="purpose">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    type="text"
                    name="purpose"
                    value={leaveData.purpose}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="contact_phone">
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact_phone"
                    value={leaveData.contact_phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="personal_email">
                  <Form.Label>Personal Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="personal_email"
                    value={leaveData.personal_email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100">
              Submit Leave Request
            </Button>
          </Form>
        </Card.Body>
      </Card>


      <Card className="w-75 m-2">
        <Card.Body className="mt-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>From Date</th>
                <th>To Date</th>
                <th>Leave Type</th>
                <th>Leave Status</th>
                <th>Purpose</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.from_date}</td>
                  <td>{leave.to_date}</td>
                  <td>{leave.leave_type}</td>
                  <td>{leave.leave_status}</td>
                  <td>{leave.purpose}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(leave.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Leave;
