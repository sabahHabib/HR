import React, { useEffect, useState } from 'react';
import { api } from '../api/apiClient';
import { Table, Button, Spinner, Form, Card, Alert, Row, Col } from 'react-bootstrap';
import { FaUserCheck, FaUserTimes, FaUsers, FaInfoCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [userdata, setUserdata] = useState<any | null>(null);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [leave, setLeave] = useState<any[]>([]);
    const [userid, setUserid] = useState<number | ''>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const [showUserData, setShowUserData] = useState<boolean>(false);
    const [showAttendance, setShowAttendance] = useState<boolean>(false);
    const [showLeave, setShowLeave] = useState<boolean>(false);

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/user');
            setUsers(response.data);
        } catch (error) {
            setMessage("Error fetching records.");
        }
        setLoading(false);
    };

    const fetchData = async () => {
        if (userid === '') {
            setMessage('Please enter a valid ID');
            return;
        }
        setLoading(true);
        try {
            const response = await api.get(`/user/${userid}`);
            setUserdata(response.data);
            setShowUserData(true);
            setShowAttendance(false);
            setShowLeave(false);
        } catch (error) {
            setMessage("Error fetching data.");
        }
        setLoading(false);
    };

    const fetchAttendance = async () => {
        if (userid === '') {
            setMessage('Please enter a valid ID');
            return;
        }
        setLoading(true);
        try {
            const response = await api.get(`/attendance/${userid}`);
            setAttendance(response.data);
            setShowAttendance(true);
            setShowUserData(false);
            setShowLeave(false);
        } catch (error) {
            setMessage("Error fetching attendance.");
        }
        setLoading(false);
    };

    const fetchLeave = async () => {
        if (userid === '') {
            setMessage('Please enter a valid ID');
            return;
        }
        setLoading(true);
        try {
            const response = await api.get(`/leave/${userid}`);
            setLeave(response.data);
            setShowLeave(true);
            setShowUserData(false);
            setShowAttendance(false);
        } catch (error) {
            setMessage("Error fetching leave.");
        }
        setLoading(false);
    };

    const activateUser = async () => {
        if (userid === '') {
            setMessage('Please enter a valid ID');
            return;
        }
        setLoading(true);
        try {
            await api.post(`/activate/${userid}`);
            setMessage("User activated successfully.");
            getUsers(); // Refresh user list
        } catch (error) {
            setMessage("Error activating user.");
        }
        setLoading(false);
    };

    const deactivateUser = async () => {
        if (userid === '') {
            setMessage('Please enter a valid ID');
            return;
        }
        setLoading(true);
        try {
            await api.post(`/deactivate/${userid}`);
            setMessage("User deactivated successfully.");
            getUsers(); // Refresh user list
        } catch (error) {
            setMessage("Error deactivating user.");
        }
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setUserid(value === '' ? '' : Number(value));
        setMessage(null);
    };

    return (
        <div className="container mt-5">
            {loading && <Spinner animation="border" role="status" />}

            {message && <Alert variant="danger">{message}</Alert>}

            <Row className="mb-4 mt-5">
                <Col>
                    <Form.Group className="mt-5">
                        <Form.Control
                            type="number"
                            value={userid}
                            onChange={handleInputChange}
                            placeholder="Enter UserID"
                            className="rounded-pill"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <div className="d-flex justify-content-between mb-4 mt-4">
                        <Button variant="primary" onClick={fetchData} className="mx-2">Fetch Data</Button>
                        <Button variant="info" onClick={fetchAttendance} className="mx-2">Fetch Attendance</Button>
                        <Button variant="warning" onClick={fetchLeave} className="mx-2">Fetch Leave</Button>
                        <Button variant="success" onClick={activateUser} className="mx-2">Activate User</Button>
                        <Button variant="danger" onClick={deactivateUser} className="mx-2">Deactivate User</Button>
                    </div>
                </Col>
            </Row>

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <h4 className="text-center"><FaUsers /> Employee List</h4>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.name}</td>
                                    <td>{record.email}</td>
                                    <td>{record.role}</td>
                                    <td>{record.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {showUserData && userdata && (
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <h4 className="text-center"><FaInfoCircle /> User Data</h4>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>CNIC</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userdata.cnic}</td>
                                    <td>{userdata.user.name}</td>
                                    <td>{userdata.user.email}</td>
                                    <td>{userdata.user.role}</td>
                                    <td>{userdata.phone_no}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}

            {showAttendance && attendance.length > 0 && (
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <h4 className="text-center"><FaUserCheck /> Attendance Data</h4>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Total Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((att) => (
                                    <tr key={att.id}>
                                        <td>{att.date}</td>
                                        <td>{att.check_in}</td>
                                        <td>{att.check_out}</td>
                                        <td>{att.total_time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}

            {showLeave && leave.length > 0 && (
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <h4 className="text-center"><FaUserTimes /> Leave Data</h4>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Leave Type</th>
                                    <th>Status</th>
                                    <th>Replacement If</th>
                                    <th>Contact Landline</th>
                                    <th>Contact Phone</th>
                                    <th>Personal Email</th>
                                    <th>Address During Leave</th>
                                    <th>Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leave.map((lv) => (
                                    <tr key={lv.id}>
                                        <td>{lv.from_date}</td>
                                        <td>{lv.to_date}</td>
                                        <td>{lv.leave_type}</td>
                                        <td>{lv.leave_status}</td>
                                        <td>{lv.replacement_if}</td>
                                        <td>{lv.contact_landline}</td>
                                        <td>{lv.contact_phone}</td>
                                        <td>{lv.personal_email}</td>
                                        <td>{lv.address_during_leave}</td>
                                        <td>{lv.purpose}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default AdminDashboard;