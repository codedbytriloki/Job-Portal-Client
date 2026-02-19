import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliededJobTable from './AppliededJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJob from '@/hooks/useGetAppliedJob'

const Profile = () => {
  useGetAppliedJob();

  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={`${user?.profile?.profilePhoto || "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"}`} />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullName}</h1>
              <p>{user?.profile?.bio || "No bio available"}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right bg-white/75 shadow py-1 outline-white cursor-pointer"><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-3 my-2'>
            {
              user?.profile?.skills?.length > 0 ? user.profile.skills.map((item, index) => <Badge key={index} className=" text-white font-bold bg-black shadow " variant="ghost" >{item}</Badge>) : <span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <label className='text-md font-bold'>Resume</label>
          {
            user?.profile?.resume ? (
              <a target='_blank' rel='noopener noreferrer' href={user?.profile?.resume} className='text-blue-600 w-full hover:underline cursor-pointer'>
                {user?.profile?.resumeOriginalName || 'resume'}
              </a>
            ) : <span>NA</span>
          }
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Job</h1>
        {/* Application Table  */}
        <AppliededJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile