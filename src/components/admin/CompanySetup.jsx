import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const param = useParams();
  useGetCompanyById({ CopID: param.id });
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null
  })
  const { singleCompany } = useSelector(store => store.company);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("name", input.companyName);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${param.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        console.log(res.data.company);
        navigate("/admin/companies");
        setInput({
          companyName: "",
          description: "",
          website: "",
          location: "",
          file: null
        })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    setInput({
      companyName: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null
    })
  }, [singleCompany])

  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <div className='flex items-center gap-5 pb-5 justify-start '>
          <Button type="button" variant='outline' onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 font-semibold cursor-pointer"><ArrowLeft /> <span>Back</span></Button>
          <h1 className='text-2xl font-bold text-gray-800'>Company Setup</h1>
        </div>
        <form onSubmit={submitHandler} >
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Company Name</Label>
              <Input type="text" onChange={changeHandler} className="my-2" name="companyName" value={input.companyName} placeholder="JobHunt, Microsoft etc." />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" onChange={changeHandler} className="my-2" name="description" value={input.description} placeholder="Company Description" />
            </div>
            <div>
              <Label>Website</Label>
              <Input type="text" onChange={changeHandler} className="my-2" name="website" value={input.website} placeholder="Company Website URL" />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" onChange={changeHandler} className="my-2" name="location" value={input.location} placeholder="Company Location" />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} className="my-2" name="file" />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-2  bg-black text-white " disabled><Loader2 className='mr-2 h-4 w-4 animate-spin ' />Please wait</Button> : <Button type="submit" className="w-full my-2 bg-black text-white cursor-pointer">Update</Button>
          }
        </form>
      </div>
    </div>
  )
}

export default CompanySetup