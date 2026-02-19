import React from 'react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLY_API_END_POINT } from '../utils/constant';

const sortListing = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(`${APPLY_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants && applicants?.applications.map((applicant) => (
            <TableRow key={applicant._id}>
              <TableHead>{applicant?.applieant?.fullName}</TableHead>
              <TableHead>{applicant?.applieant?.email}</TableHead>
              <TableHead>{applicant?.applieant?.phoneNumber}</TableHead>
              <TableHead>{applicant?.applieant?.profile?.resume ? <a className='text-blue-600 hover:underline' href={applicant?.applieant?.profile?.resume} target="_blank" rel="noopener noreferrer">{applicant?.applieant?.profile?.resumeOriginalName}</a> : <span>NA</span>}</TableHead>
              <TableHead>{applicant?.createdAt?.split("T")[0]}</TableHead>
              <TableHead className="text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer text-right">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-26 bg-white shadow border-0">
                    {
                      sortListing.map((status, index) => {
                        return (
                          <div onClick={() => statusHandler(status.toLowerCase(), applicant._id)} key={index} className='flex items-center gap-3 w-fit cursor-pointer  hover:text-gray-600'>
                            <span className='text-sm'>{status}</span>
                          </div>
                        )
                      })
                    }
                  </PopoverContent>
                </Popover>
              </TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable