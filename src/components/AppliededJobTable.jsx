import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux';

const AppliededJobTable = () => {
  const { appliedJobs } = useSelector(store => store.job);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right' >Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            appliedJobs.length > 0 ? appliedJobs.map((applicantjob) => (
              <TableRow key={applicantjob._id}>
                <TableCell>{applicantjob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{applicantjob?.job?.title}</TableCell>
                <TableCell>{applicantjob?.job?.company?.name}</TableCell>
                <TableCell className='text-right'><Badge className={`${applicantjob?.status === "pending" ? "bg-yellow-500" : applicantjob?.status === "accepted" ? "bg-green-500" : "bg-red-500"} text-white`}>{applicantjob?.status}</Badge></TableCell>
              </TableRow>
            )) : <TableRow><TableCell colSpan={4} className='text-center'>No applied job found.</TableCell></TableRow>
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliededJobTable