import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJob from '@/hooks/useGetAllAdminJob'
import { useDispatch } from 'react-redux'
import { setSearchTextByJob } from '@/redux/jobSlice'
import AdminJobsTable from './AdminJobsTable'

const Job = () => {
  useGetAllAdminJob();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchTextByJob(input));
  }, [input, dispatch])
  
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 '>
        <div className='flex items-center justify-between my-5'>
          <Input className="w-fit" placeholder="Filter by name" onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate('/admin/jobs/create')} className="bg-black text-white cursor-pointer">New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default Job