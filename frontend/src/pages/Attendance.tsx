import React, { useState ,useEffect} from 'react';
import { FaEdit } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useAttendance } from '../hooks/useAttendance';
import { Card, Button, Table } from 'react-bootstrap';

interface AttendanceRecord {
  id: number;
  check_in: string;
  check_out: string;
  date: string;
  total_time: string;
}

const Attendance = () => {
  const {
    attendanceRecords,
    attendanceUpdate,
    setAttendanceUpdate,
    errorMessage,
    loading,
    currentPage,
    setCurrentPage,
    handleUpdateAttendance,
    paginate,
    currentRecords,
    attendanceId,
    setAttendanceId,
     fetchAttendanceRecords,
      handleCheckOut,
       handleCheckIn
  } = useAttendance();

  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const handleEditClick = (record: AttendanceRecord) => {
    setAttendanceId(record.id);
    setAttendanceUpdate({
      check_in: record.check_in,
      check_out: record.check_out,
      date: record.date,
    });
    setIsUpdateVisible(true);
  };

  const handleUpdateSubmit = () => {
    handleUpdateAttendance();
    setIsUpdateVisible(false);
    setAttendanceId(null);
  };

  return (
    <div className="container mt-5 w-75">
      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

      {isUpdateVisible && (
        <Card className="m-5">
          <Card.Body>
            <h5>Update Attendance</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Check-in Time"
                value={attendanceUpdate.check_in}
                onChange={(e) =>
                  setAttendanceUpdate({ ...attendanceUpdate, check_in: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Check-out Time"
                value={attendanceUpdate.check_out}
                onChange={(e) =>
                  setAttendanceUpdate({ ...attendanceUpdate, check_out: e.target.value })
                }
              />
              <Button variant="success" onClick={handleUpdateSubmit}>
                Update
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
      <Card className="mb-4">
        <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Total Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{record.date}</td>
                      <td>{record.check_in}</td>
                      <td>{record.check_out}</td>
                      <td>{record.total_time}</td>
                      <td>
                        <Button variant="link" onClick={() => handleEditClick(record)}>
                          <FaEdit />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant="secondary"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <HiChevronLeft />
                </Button>
                <p> Page: {currentPage} </p>
                <Button
                  variant="secondary"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage * 5 >= attendanceRecords.length}
                >
                  <HiChevronRight />
                </Button>
              </div>


        </Card.Body>
      </Card>
</div>
  );
};

export default Attendance;
