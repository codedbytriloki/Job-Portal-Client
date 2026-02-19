import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Company = () => {
  useGetAllCompany();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch])

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 '>
        <div className='flex items-center justify-between my-5'>
          <Input className="w-fit" placeholder="Filter by name" onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate('/admin/companies/create')} className="bg-black text-white cursor-pointer">New Company</Button>
        </div>
        <CompanyTable />
      </div>
    </div>
  )
}

export default Company