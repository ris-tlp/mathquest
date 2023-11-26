import React from 'react'

const Overview = ({course}) => {
  console.log(course)
  return (
    // <div><p>{course.courseDescription}</p>
    // {course.courseDuration}</div>
    <div>
  <h1 className='text-white text-2xl'>{course.courseName}</h1>
  <p className='text-white my-2'>{course.courseDescription}</p>
  <p className='text-white my-2'>Course Duration: {course.courseDuration}</p>
  
  <div className="flex my-8 sm:w-full">
            <img src={course.instructorImage} className="h-60 my-2 border-4" />
            <div className='mx-4'><p className="text-white my-2  text-lg">{course.courseInstructor}</p>
            <p className="text-white my-2 text-sm">{course.instructorDescription}</p></div>
          </div>
    </div>


  )
}

export default Overview