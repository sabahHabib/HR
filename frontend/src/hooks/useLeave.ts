import { useState, useEffect } from 'react';
import { api } from '../api/apiClient';


export const useLeave = () => {
  const [leaveData, setLeaveData] = useState({
    from_date: '',
    to_date: '',
    leave_type: '',
    leave_status: '',
    contact_phone: '',
    personal_email: '',
    purpose: '',
  });

  const [leaves, setLeaves] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/leaves/', leaveData);
      setLeaveData({
      from_date: '',
      to_date: '',
      leave_type: '',
      leave_status: '',
      contact_phone: '',
      personal_email: '',
      purpose: '',
    });
      fetchLeaves();
      console.log(response.data);
    } catch (err) {
      setError('Failed to create leave request');
      console.error(err);
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await api.get('/leaves/');
      setLeaves(response.data);
    } catch (err) {
      console.error('Failed to fetch leave records', err);
    }
  };

  const handleDelete = async (leaveId: number) => {
    try {
      await api.delete(`/leaves/${leaveId}`);
      setLeaves(leaves.filter((leave) => leave.id !== leaveId));
    } catch (err) {
      console.error('Failed to delete leave', err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return {
    leaveData,
    leaves,
    error,
    handleChange,
    handleSubmit,
    handleDelete,
  };
};
