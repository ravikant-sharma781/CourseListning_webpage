import { React, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CoursesList from './CoursesList';
import Navbar from './Navbar';

function NewCourse() {
  const [data, setData] = useState({});

  const refreshPage = () => {
    window.location.reload(false);
  }

  const navigate = useNavigate();


  useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      navigate('/Login');
    }
  }, [])

  function getDataFun() {
    axios.get("http://localhost:5000/api/courses")
      .then((res) => {
        console.log(res)
        const fetchData = res.data;
        setData(fetchData);
      })
      .catch((err) => { console.log(err) });
  }

  useEffect(() => { getDataFun() }, [])


  const [course, SetCourse] = useState({
    courseTitle: "",
    courseCode: "",
    courseDescription: "",
    courseYear: "",
    courseSemester: ""

  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetCourse(
      {
        ...course,
        [name]: value
      })
  }

  const handleSubmit = () => {
    axios.post("http://localhost:5000/NewCourse", course)
      .then((res) => { alert(res.data.message) })
      .catch((err) => { alert(err) });
  }


  return (
    <div className='w-full h-screen'>
      {
        localStorage.isLoggedin && <Navbar />
      }
      <div className='relative top-28 flex justify-around w-9/12 m-auto border p-10'>
        <div className='w-2/5'>
          <form onSubmit={handleSubmit}>
            <div className=''>
              <label htmlFor="courseTitle" className="mt-2 block text-sm font-medium leading-6 text-gray-900">Course Title</label>
              <div className="">
                <input id="courseTitle" name="courseTitle" value={course.courseTitle} onChange={handleChange} type="text" required autoComplete="courseTitle" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="courseCode" className="mt-2 block text-sm font-medium leading-6 text-gray-900">Course Code</label>
              <div className="">
                <input id="courseCode" name="courseCode" value={course.courseCode} onChange={handleChange} type="number" min={10000} max={999999} autoComplete="courseCode" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="courseDescription" className="mt-2 block text-sm font-medium leading-6 text-gray-900">Course Description</label>
              <div className="">
                <textarea name="courseDescription" id="courseDescription" value={course.courseDescription} onChange={handleChange} autoComplete="courseDescription" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" cols="10" rows="5" />
              </div>
            </div>
            <div>
              <button type="submit" className="w-40 mt-6 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Course</button>
            </div>

          </form>
        </div>
        <div className='w-2/5'>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='flex justify-between items-center mt-7'>
                <div className=''>
                  <select id="cources-list" className='p-1 border-2 rounded leading-6'>
                    <option value="random">None</option>
                    <option value="random">lorem</option>
                    <option value="random">dfgkejn</option>
                    <option value="random">cource</option>
                    <option value="random">list of cources</option>
                  </select>
                </div>
                <div>
                  <button type="button" onClick={refreshPage} className="w-25 justify-center w-full rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Refresh</button>
                </div>
              </div>
              <div className='mt-3'>
                <div className=''>
                  <label htmlFor="courseYear" className="mt-2 block text-sm font-medium leading-6 text-gray-900">Course Year</label>
                  <div className="">
                    <input id="courseYear" name="courseYear" value={course.courseYear} onChange={handleChange} type="number" min={1999} max={2099} step={1} autoComplete="courseYear" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className=''>
                  <label htmlFor="courseSemester" className="mt-2 block text-sm font-medium leading-6 text-gray-900">Course Semester</label>
                  <div className="">
                    <input id="courseSemester" name="courseSemester" type="number" onChange={handleChange} value={course.courseSemester} min={1} max={10} autoComplete="courseSemester" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="w-40 mt-6 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Instance</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <div className='relative top-32 h-96 pb-10'>
        <CoursesList />
      </div> */}

    </div >
  )
}

export default NewCourse
