import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate('/browse');
  }

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold '>Search, Apply & <br /> Get Your <span className='text-[#6a38c2]'>Dream Jobs</span></h1>
        <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ipsa, commodi ea soluta corrupti rem a e, dolor <br /> laudantium repudiandae fugit nihil.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-4 mx-auto'>
          <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder='Find your dream jobs' className='outline-none border-none w-full' />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6a38c2] cursor-pointer text-white"><Search className='w-5 h-6' /></Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection