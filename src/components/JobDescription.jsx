import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLY_API_END_POINT, JOB_API_END_POINT } from './utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();

  const { user } = useSelector(store => store.auth);
  const { singleJob } = useSelector(store => store.job);

  const isInitialyApplied = singleJob?.applications?.some(application => application.applieant == user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitialyApplied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applieant == user?._id))
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);


  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLY_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        // update ui 
        setIsApplied(true); // update local state
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applieant: user?._id }] };
        dispatch(setSingleJob(updateSingleJob)); // real time ui change
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  return (
    <div >
      <Navbar />
      <div className='max-w-7xl my-10 mx-auto'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
            <div className='flex items-center gap-2 mt-4'>
              <Badge className=" text-blue-700 font-bold bg-white/55 shadow" variant="secondary">{singleJob?.position} Positions</Badge>
              <Badge className=" text-[#f83002] font-bold bg-white/55 shadow" variant="ghost">{singleJob?.jobType}</Badge>
              <Badge className=" text-[#7209b7] font-bold bg-white/55 shadow" variant="ghost">{singleJob?.salary} LPA</Badge>
            </div>
          </div>
          <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`${isApplied ? 'bg-gray-600 cursor-not-allowed text-white' : 'bg-[#7209b7] text-white cursor-pointer '}`}>{isApplied ? 'Already Applied' : 'Apply Now'}</Button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
        <div className='my-4'>
          <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
          <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
          <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description} </span></h1>
          <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} years</span></h1>
          <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
          <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
          <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
      </div>
    </div>
  )
}

export default JobDescription