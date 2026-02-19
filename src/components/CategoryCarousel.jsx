import React, { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate('/browse');
  }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3 ">
                <Button onClick={() => searchJobHandler(cat)} className="rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer shadow">{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className=" cursor-pointer" />
        <CarouselNext className=" cursor-pointer" />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel