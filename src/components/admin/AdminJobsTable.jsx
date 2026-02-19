import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const AdminJobsTable = () => {

  const navigate = useNavigate();
  const { allAdminJob, searchTextByJob } = useSelector(store => store.job);
  const [filterJob, setfilterJob] = useState([]);

  useEffect(() => {
    if (!allAdminJob || allAdminJob.length === 0) {
      setfilterJob([]);
      return;
    }
    const filteredJob = allAdminJob.filter((job) => {
      if (!searchTextByJob) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchTextByJob.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchTextByJob.toLowerCase())
    })
    setfilterJob(filteredJob);
  }, [allAdminJob, searchTextByJob])


  return (
    <div>
      <Table>
        <TableCaption >A  list of your recent posted jobs</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            !allAdminJob || allAdminJob.length === 0 ? <TableRow><TableCell colSpan="4" className="text-center">Yet not registered any company</TableCell></TableRow> : (
              <>
                {
                  filterJob.map((job) => {
                    return (
                      <>
                        <TableRow key={job._id}>
                          <TableCell>
                            {job.company?.name}
                          </TableCell>
                          <TableCell>{job?.title}</TableCell>
                          <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                          <TableCell className="text-right cursor-pointer">
                            <Popover >
                              <PopoverTrigger className="text-right cursor-pointer"><MoreHorizontal /></PopoverTrigger>
                              <PopoverContent className="w-26 bg-white border-0" >
                                {/* <div className='flex items-center gap-2 w-fit cursor-pointer  hover:text-gray-600' onClick={() => navigate(`/admin/jobs/${job._id}`)}>
                                  <Edit2 className='w-4' />
                                  <span className='text-sm'>Edit</span>
                                </div> */}
                                <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer  hover:text-gray-600'>
                                  <Eye className='w-4' />
                                  <span className='text-sm'>Applicants</span>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                        </TableRow>
                      </>
                    )
                  })
                }
              </>
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable