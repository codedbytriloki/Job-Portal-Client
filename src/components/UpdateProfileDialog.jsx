import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(",") || "",
    file: null
  });

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file: file });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills || "");
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      // axios handles the Content-Type header for FormData
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} >
        <DialogContent className="bg-white sm:max-w-[425px] lg:max-w-[500px]" onInteractOutside={() => setOpen(false)}>
          <DialogHeader >
            <DialogTitle >Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" type="text" className="col-span-3" name="fullName" value={input.fullName} onChange={changeHandler} />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" className="col-span-3" type="email" name="email" value={input.email} onChange={changeHandler} />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="phoneNumber" className="text-right">Number</Label>
                <Input id="phoneNumber" type="text" className="col-span-3" name="phoneNumber" value={input.phoneNumber} onChange={changeHandler} />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <Input id="bio" type="text" className="col-span-3" name="bio" value={input.bio} onChange={changeHandler} />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="skills" className="text-right">Skills</Label>
                <Input id="skills" type="text" className="col-span-3" name="skills" value={input.skills} onChange={changeHandler} />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="file" className="text-right">Resume</Label>
                <Input id="file" type="file" className="col-span-3" name="file" accept="application/pdf" onChange={handleFileChange} />
              </div>
            </div>
            <DialogFooter>
              {
                loading ? <Button className="w-full my-2  bg-black text-white " disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin ' />Please wait</Button> : <Button type="submit" className="w-full my-2 bg-black text-white cursor-pointer">Update</Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog