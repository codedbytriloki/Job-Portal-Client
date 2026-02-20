import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useNavigate } from 'react-router-dom'

const JobCreate = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const { companies } = useSelector(store => store.company);

  const changeSelect = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // front-end sanity check before sending
    if (!input.title || !input.description || !input.requirements || !input.salary || !input.location || !input.jobType || input.experience === "" || input.position === "" || !input.companyId) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...input,
        salary: Number(input.salary),
        experience: Number(input.experience),
        position: Number(input.position),
        requirements: input.requirements.trim()
      };

      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center w-screen my-5'>
        <form action="" className='p-8 max-w-4xl border border-gray-200 shadow rounded' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label>Title</Label>
              <Input type="text" value={input.title} onChange={changeEventHandler} name="title" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" value={input.description} onChange={changeEventHandler} name="description" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input type="text" value={input.requirements} onChange={changeEventHandler} name="requirements" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Salary</Label>
              <Input type="text" value={input.salary} onChange={changeEventHandler} name="salary" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" value={input.location} onChange={changeEventHandler} name="location" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input type="text" value={input.jobType} onChange={changeEventHandler} name="jobType" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input type="text" value={input.experience} onChange={changeEventHandler} name="experience" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input type="number" value={input.position} onChange={changeEventHandler} name="position" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              {
                companies.length > 0 && (
                  <Select onValueChange={changeSelect}>
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder={"Select a Company"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="bg-white">
                        {companies.map((company) => {
                          return (
                            <SelectItem key={company._id} value={company?.name?.toLowerCase()} >
                              {company?.name}
                            </SelectItem>
                          )
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )
              }
            </div>
          </div>
          {
            loading ? <Button className="w-full mt-4 bg-black text-white " disabled><Loader2 className='mr-2 h-4 w-4 animate-spin ' />Please wait</Button> : <Button type="submit" className="w-full mt-4 bg-black text-white cursor-pointer">Post New Job</Button>
          }
          {
            companies.length == 0 && <p className='text-red-500 text-sm font-bold text-center mt-3'>*Please register a company first, before posting a new jobs.</p>
          }
        </form>
      </div>
    </div>
  )
}

export default JobCreate