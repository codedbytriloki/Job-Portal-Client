import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '@/redux/authSlice'


const Navbar = () => {
  // const user = true;
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className='bg-white'>
      <div className='container flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>Job <span className='text-[#f83002]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-8'>
          <ul className='flex font-medium items-center gap-5'>
            {
              user && user.role == 'recruiter' ? (
                <>
                  <li><Link to='/admin/companies' className='hover:text-gray-800'>Companies</Link></li>
                  <li><Link to='/admin/jobs' className='hover:text-gray-800'>Jobs</Link></li>
                </>
              ) :
                (
                  <>
                    <li><Link to='/' className='hover:text-gray-800'>Home</Link></li>
                    <li><Link to='/jobs' className='hover:text-gray-800'>Jobs</Link></li>
                    <li><Link to='/browse' className='hover:text-gray-800'>Browse</Link></li>
                  </>
                )
            }
          </ul>
          {!user ? (
            <div className='flex items-center gap-1.5 mx-2'>
              <Link to="/login"><Button className='cursor-pointer font-bold bg-white/75 shadow py-1 outline-white hover:shadow-lg '>Login</Button></Link>
              <Link to="/signup"><Button className='ml-4 bg-[#7209b7] hover:bg-[#62079f] text-white cursor-pointer'>Sign Up</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={user?.profile?.profilePhoto || "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"} alt="shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className='w-80 bg-white' align="end">
                <div className='flex gap-4 space-y-2 '>
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto || "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"} alt="shadcn" />
                  </Avatar>
                  <div>
                    <h4 className='font-bold'>{user?.fullName}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col text-gray-600'>
                  {
                    user && user.role == 'student' && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Button variant="link" className='outline-0 border-0 cursor-pointer'><Link to="/profile">View Profile</Link></Button>
                      </div>
                    )
                  }
                  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link" className='outline-0 border-0 cursor-pointer'>Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar