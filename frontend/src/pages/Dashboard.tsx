import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAttendance } from '../hooks/useAttendance';
import { useLeave } from '../hooks/useLeave';

const Dashboard: React.FC = () => {
  const { attendanceRecords } = useAttendance();
  const { leaves } = useLeave();
  const totalLeavesTaken = leaves.length;
  const totalAttendanceDays = attendanceRecords.length;

  return (
    <Container className="d-flex">
      <div className="flex-grow-1">
        <div className="container mt-5">
          <Row>
          <Col md={3}>
          </Col>
            <Col md={4}>
              <Card>
                <Card.Header>Attendance</Card.Header>
                <Card.Body>
                  <Card.Title>Total Attendance Days</Card.Title>
                  <Card.Text>
                    {totalAttendanceDays}
                  </Card.Text>
                  <Link to="/attendance">
                    <Button variant="primary">View Attendance</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>


            <Col md={4}>
              <Card>
                <Card.Header>Leave</Card.Header>
                <Card.Body>
                  <Card.Title>Total Leaves Taken</Card.Title>
                  <Card.Text>
                    {totalLeavesTaken}
                  </Card.Text>
                  <Link to="/leave">
                    <Button variant="primary">View Leaves</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
