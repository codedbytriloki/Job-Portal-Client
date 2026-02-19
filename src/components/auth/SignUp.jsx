import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const SignUp = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  })

  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth)

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true))
      // let axios set the Content-Type header (including boundary) automatically
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          <div className='my-2'>
            <Label htmlFor="fullName">Name</Label>
            <Input type="text" value={input.fullName} name="fullName" onChange={changeEventHandler} className="my-2" placeholder="Enter your name" />
          </div>
          <div className='my-2'>
            <Label htmlFor="email">Email</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} className="my-2" placeholder="example@gmail.com" />
          </div>
          <div className='my-2'>
            <Label htmlFor="phone">Phone Number</Label>
            <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} className="my-2" placeholder="Enter your phone number" />
          </div>
          <div className='my-2'>
            <Label htmlFor="password">Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} className="my-2" placeholder="Enter your password" />
          </div>
          <div className='my-2 flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Input type="radio" value="student" name="role" checked={input.role == 'student'} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input type="radio" value="recruiter" name="role" checked={input.role == 'recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2 '>
              <Label htmlFor="file">Profile</Label>
              {/* name must match FormData key and multer expectation */}
              <Input type="file" accept="image/*" name="file" onChange={handleFileChange} className="my-2 cursor-pointer" />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-2  bg-black text-white " disabled><Loader2 className='mr-2 h-4 w-4 animate-spin ' />Please wait</Button> : <Button type="submit" className="w-full my-2 bg-black text-white cursor-pointer">Sign Up</Button>
          }
          <span className='text-sm text-gray-600 '>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default SignUp
