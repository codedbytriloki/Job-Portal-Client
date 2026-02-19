import { APPLY_API_END_POINT } from '@/components/utils/constant';
import { setAppliedJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLY_API_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  }, [])
}

export default useGetAppliedJob;