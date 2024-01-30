import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Update from './Update';
import Navbar from './Navbar';

const CoursesList = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({})

  useEffect(() => {
    axios.get("http://localhost:5000/courses")
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => console.log("I'm the error from backend", err));
  }, [])

  const deletefun = (id, name) => {
    if (window.confirm(`Confirm to delete ${name}`)) {
      axios.post("http://localhost:5000/deleteCourse", { courseID: id })
        .then((res) => {
          alert(res.data.message);
          axios.get("http://localhost:5000/courses")
            .then((result) => {
              setData(result.data);
            })
            .catch((err) => console.log("Error fetching updated data:", err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updateFun = (course) => {
    navigate('./Update', { state: { data: { course } } });
    <Update parentData={course} />
  }

  return (
    <div className='w-full'>
      {
        localStorage.isLoggedin && <Navbar />
      }
      <div className='flex justify-center align-center mt-20'>
        <table className='border-separate border-spacing-y-6 border-spacing-x-12 border-slate-500 text-left'>
          <caption className="caption-top my-5">
            List of Available courses
          </caption>
          <tbody className=''>
            <tr className='border border-slate-600'>
              <th className=''>S.No</th>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Course Description</th>
              <th>Semester</th>
              <th>Year</th>
            </tr>

            {
              Object.values(data).map((course, index) => (
                <tr key={index}>
                  <td className='px-3'>{index + 1}</td>
                  <td className='px-3'>{course.courseTitle}</td>
                  <td className='px-3'>{course.courseCode}</td>
                  <td className='px-3'>{course.courseDescription}</td>
                  <td className='px-3'>{course.courseSemester == null ? "--" : course.courseSemester}</td>
                  <td className='px-3'>{course.courseYear == null ? "--" : course.courseYear}</td>
                  <th><button onClick={() => { updateFun(course) }} className='w-25 justify-center w-full rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Update</button></th>
                  <th><button onClick={() => { deletefun(course._id, course.courseTitle), console.log(course._id, course.courseTitle) }} className='w-25 justify-center w-full rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Delete</button></th>
                </tr>
              ))

            }
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default CoursesList
