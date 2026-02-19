import { JOB_API_END_POINT } from '@/components/utils/constant'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(store => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        let url = `${JOB_API_END_POINT}/get`;
        if (searchQuery) {
          url += `?keyword=${searchQuery}`;
        }
        const res = await axios.get(url, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (err) {
        console.log("fetchAllJobs error", err);
        dispatch(setAllJobs([]));
      }
    }
    fetchAllJobs();
  }, [searchQuery, dispatch]); // re-fetch when search changes
}

export default useGetAllJobs