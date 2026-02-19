import { JOB_API_END_POINT } from '@/components/utils/constant'
import { setAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAdminJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchAdminAllJobs();
  }, [])
}


export default useGetAllAdminJob