import React, { use, useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const dispatch = useDispatch();
  useGetAllJobs();

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.location.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery])


  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    }
  },[])

  return (
    <div className=''>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div>
            {/* {Filter page } */}
            <FilterCard />
          </div>
          {
            filterJobs.length <= 0 ? <p>No jobs found</p> : (
              <div className="flex-1 h-[80vh] overscroll-y-auto pb-5">
                <div className='grid grid-cols-3 gap-4'>
                  {
                    filterJobs.map((job) => (
                      <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.3 }} key={job?._id}>
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs