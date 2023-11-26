import React from 'react'

const Overview = ({course}) => {
  console.log(course)
  return (
    <div>{course.courseDescription}</div>
  )
}

export default Overview