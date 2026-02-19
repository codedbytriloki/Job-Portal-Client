import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Company from './components/admin/Company'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import Job from './components/admin/Job'
import JobCreate from './components/admin/JobCreate'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/description/:id' element={<JobDescription />} />

          {/* admin */}
          <Route path='/admin/companies' element={<ProtectedRoute><Company /></ProtectedRoute>} />
          <Route path='/admin/companies/create' element={<ProtectedRoute><CompanyCreate /></ProtectedRoute>} />
          <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
          <Route path='/admin/jobs' element={<ProtectedRoute><Job /></ProtectedRoute>} />
          <Route path='/admin/jobs/create' element={<ProtectedRoute><JobCreate /></ProtectedRoute>} />
          <Route path='/admin/jobs/:id/applicants' element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
