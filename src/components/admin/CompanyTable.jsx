import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CompanyTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    // ensure we always compute an array even if companies is empty or undefined
    const list = Array.isArray(companies) ? companies : [];
    const filteredCompany = list.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);


  return (
    <div>
      <Table>
        {companies && companies.length > 0 && <TableCaption>A list of your registered companies.</TableCaption>}
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            !companies || companies.length === 0 ? <TableRow><TableCell colSpan="4" className="text-center">Yet not registered any company</TableCell></TableRow> : (
              <>
                {
                  (Array.isArray(filterCompany) ? filterCompany : []).map((company) => {
                    return (
                      <>
                        <TableRow key={company._id}>
                          <TableCell>
                            <Avatar>
                              <AvatarImage src={company.logo} />
                            </Avatar>
                          </TableCell>
                          <TableCell>{company.name}</TableCell>
                          <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                          <TableCell className="text-right cursor-pointer">
                            <Popover >
                              <PopoverTrigger className="text-right cursor-pointer"><MoreHorizontal /></PopoverTrigger>
                              <PopoverContent className="w-25 bg-white border-0" >
                                <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={() => navigate(`/admin/companies/${company._id}`)}>
                                  <Edit2 className='w-4' />
                                  <span className='text-sm'>Edit</span>
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

export default CompanyTable