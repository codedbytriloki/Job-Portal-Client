import React, { use, useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if(user) {
      navigate('/');
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>LogIn</h1>
          <div className='my-2'>
            <Label htmlFor="email">Email</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} className="my-2" placeholder="example@gmail.com" />
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
          </div>
          {
            loading ? <Button className="w-full my-2  bg-black text-white " disabled><Loader2 className='mr-2 h-4 w-4 animate-spin ' />Please wait</Button> : <Button type="submit" className="w-full my-2 bg-black text-white cursor-pointer">SignIn</Button>
          }

          <span className='text-sm text-gray-600 '>Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link></span>
        </form>
      </div>
    </div>
  )
}


export default Login