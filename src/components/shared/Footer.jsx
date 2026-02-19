import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-gray-200 py-8 bg-white'>
      <div className='container mx-auto max-w-7xl py-10 px-4'>
        <div className='flex flex-col md:flex-row md:justify-between w-full gap-10'>
          <div className='md:w-1/3'>
            <h1 className='text-2xl font-bold py-6'>Job <span className='text-[#f83002]'>Portal</span></h1>
            <p className='text-gray-500 mb-4'>Find your next opportunity or the right talent — fast and easy.</p>
            <ul className='text-gray-600 space-y-2'>
              <li className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M12 2C8 2 4.5 4.5 4.5 8.5c0 4.875 6 11 6 11s6-6.125 6-11C19.5 4.5 16 2 12 2z' /></svg>
                <span>123 Market St, City, Country</span>
              </li>
              <li className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M16 12H8m8 0a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h4a4 4 0 014 4v4z' /></svg>
                <a href='mailto:info@jobportal.example' className='hover:text-gray-800'>info@jobportal.example</a>
              </li>
              <li className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M3 5h2l2 7 6 6 7-2v2a2 2 0 01-2 2H7a4 4 0 01-4-4V5z' /></svg>
                <a href='tel:+1234567890' className='hover:text-gray-800'>+1 (234) 567-890</a>
              </li>
            </ul>
          </div>

          <div className='md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6'>
            <div>
              <h3 className='text-lg font-semibold mb-3'>Job Seekers</h3>
              <ul className='text-gray-600 space-y-2'>
                <li><a href='/jobs' className='hover:text-gray-800'>Search Jobs</a></li>
                <li><a href='/signup' className='hover:text-gray-800'>Create Account</a></li>
                <li><a href='/resume' className='hover:text-gray-800'>Upload Resume</a></li>
                <li><a href='/alerts' className='hover:text-gray-800'>Job Alerts</a></li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-3'>Employers</h3>
              <ul className='text-gray-600 space-y-2'>
                <li><a href='/post-job' className='hover:text-gray-800'>Post a Job</a></li>
                <li><a href='/companies' className='hover:text-gray-800'>Search Resumes</a></li>
                <li><a href='/pricing' className='hover:text-gray-800'>Pricing</a></li>
                <li><a href='/employer/login' className='hover:text-gray-800'>Employer Login</a></li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-3'>Resources</h3>
              <ul className='text-gray-600 space-y-2'>
                <li><a href='/about' className='hover:text-gray-800'>About Us</a></li>
                <li><a href='/blog' className='hover:text-gray-800'>Blog</a></li>
                <li><a href='/help' className='hover:text-gray-800'>Help Center</a></li>
                <li><a href='/privacy' className='hover:text-gray-800'>Privacy Policy</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className='mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-6'>
          <p className='text-gray-500'>© {year} Job Portal. All rights reserved.</p>

          <div className='flex items-center gap-4'>
            <a href='#' aria-label='Facebook' className='text-gray-600 hover:text-gray-800'>
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.88v-6.99H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.197 2.238.197v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z' /></svg>
            </a>
            <a href='#' aria-label='Twitter' className='text-gray-600 hover:text-gray-800'>
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.13 12.13 0 013 4.8a4.28 4.28 0 001.33 5.71 4.2 4.2 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.19 4.3 4.3 0 01-1.93.07 4.28 4.28 0 003.99 2.97A8.59 8.59 0 012 19.54 12.12 12.12 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.36 8.36 0 0022.46 6z' /></svg>
            </a>
            <a href='#' aria-label='LinkedIn' className='text-gray-600 hover:text-gray-800'>
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.75 18.5V10.5H6.25v8h2.5zm-1.25-9.5a1.45 1.45 0 110-2.9 1.45 1.45 0 010 2.9zM18 18.5v-4.25c0-2.28-1.22-3.35-2.85-3.35-1.31 0-1.9.72-2.22 1.23v-1.06h-2.5c.03.7 0 8 0 8h2.5v-4.47c0-.24.02-.48.09-.66.2-.48.66-.98 1.42-.98 1.01 0 1.42.74 1.42 1.82V18.5H18z' /></svg>
            </a>
            <a href='#' aria-label='Instagram' className='text-gray-600 hover:text-gray-800'>
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5a4 4 0 100 8 4 4 0 000-8zm5.5-.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 9.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z' /></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer