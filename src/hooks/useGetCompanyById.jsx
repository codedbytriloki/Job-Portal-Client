import { COMPANY_API_END_POINT } from '@/components/utils/constant'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = ({ CopID }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${CopID}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchSingleCompany();
  }, [CopID, dispatch])
}

export default useGetCompanyById