import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/apiClient';

export const useAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [attendanceId, setAttendanceId] = useState(null);
  const [attendanceUpdate, setAttendanceUpdate] = useState({
    check_in: '',
    check_out: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);



  const fetchAttendanceRecords = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/get-record/');
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setErrorMessage('There was an error fetching the attendance records.');
    } finally {
      setLoading(false);
    }
  },[]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token ) {
      fetchAttendanceRecords();
    }
  }, [token,fetchAttendanceRecords]);



  const handleCheckIn = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post('/check-in/');
      console.log("Check-in response:", response.data);
      setCheckInTime(response.data.check_in);
       await fetchAttendanceRecords();
    } catch (error) {
      console.error('Error checking in:', error);
    } finally {
      setLoading(false);
    }
  },[checkInTime]);

  const handleCheckOut = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post('/check-out/');
      setCheckOutTime(response.data.check_out);
      await fetchAttendanceRecords();
    } catch (error) {
      console.error('Error checking out:', error);
    } finally {
      setLoading(false);
    }
  },[checkOutTime]);



  const handleUpdateAttendance = async () => {
    setLoading(true);
    try {
      const response = await api.put(`/update-record/${attendanceId}`, attendanceUpdate);
      console.log('Updated Attendance:', response.data);
      await fetchAttendanceRecords();
    } catch (error) {
      console.error('Error updating attendance record:', error);
      setErrorMessage('Error updating the attendance record.');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = attendanceRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    attendanceRecords,
    checkInTime,
    checkOutTime,
    attendanceUpdate,
    setAttendanceUpdate,
    errorMessage,
    loading,
    currentPage,
    setCurrentPage,
    handleCheckIn,
    handleCheckOut,
    handleUpdateAttendance,
    paginate,
    currentRecords,
    attendanceId,
    setAttendanceId,
    fetchAttendanceRecords,
  };
};
