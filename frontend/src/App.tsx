import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Attendance from './pages/Attendance'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './helper/ProtectedRoute'
import Leave from './pages/Leave'
import AdminDashboard from './pages/AdminDashboard'
import AccessDenied from './pages/PermissionDenied'
import Profile from './pages/Profile'
import './App.css';

const App: React.FC = () => {
    return (
              <Router>
                <Navbar />
               <Routes>
               <Route path="/admin-only" element={<AccessDenied/>} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/signup" element={<SignUp />} />
                  <Route path = '/profile' element = {
                     <ProtectedRoute>
                     <Profile/>
                     </ProtectedRoute>}/>
                     <Route path = '/attendance' element = {
                      <ProtectedRoute>
                     <Attendance/>
                     </ProtectedRoute>
                 }/>
                  <Route path = '/admin-dashboard' element = {
                      <ProtectedRoute>
                     <AdminDashboard/>
                     </ProtectedRoute>
                 }/>

             <Route path = '/leave' element = {
                     <ProtectedRoute>
                     <Leave/>
                     </ProtectedRoute>}/>
                 <Route path="/dashboard" element={
                     <ProtectedRoute>
                     <Dashboard/>
                     </ProtectedRoute>}
                 />
               </Routes>
        </Router>
        );
    };

export default App;
