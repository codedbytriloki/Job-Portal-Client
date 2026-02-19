import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60))
  }

  return (
    <div className='p-5 rounded-md shadow bg-white border border-gray-100 my-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button className="rounded-full bg-white/75 shadow py-1 outline-white cursor-pointer" size='icon'><Bookmark /></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className=" bg-white/75 shadow py-1 outline-white cursor-pointer mr-3" size='icon' >
          <Avatar>
            <AvatarImage src={job?.company?.logo || "https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23106.jpg?semt=ais_hybrid&w=740&q=80"} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className=" text-blue-700 font-bold bg-white/55 shadow" variant="secondary">{job?.position} Positions</Badge>
        <Badge className=" text-[#f83002] font-bold bg-white/55 shadow" variant="ghost">{job?.jobType}</Badge>
        <Badge className=" text-[#7209b7] font-bold bg-white/55 shadow" variant="ghost">{job?.salary} LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button className="bg-white/75 shadow py-1 outline-white cursor-pointer" onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className="bg-[#7209b7] hover:bg-[#62079f] text-white cursor-pointer">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job