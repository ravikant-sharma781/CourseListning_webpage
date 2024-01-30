import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import coursesList from "./CoursesList";

const Update = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const parentData = location.state && location.state.data;

    const [courseTitle, SetCourseTitle] = useState(parentData.course.courseTitle);
    const [courseCode, SetCourseCode] = useState(parentData.course.courseCode);
    const [courseYear, SetCourseYear] = useState(parentData.course.courseYear);
    const [courseSemester, SetCourseSemester] = useState(parentData.course.courseSemester);
    const [courseDescription, SetCourseDescription] = useState(parentData.course.courseDescription);
    const _id = parentData.course._id;


    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedValues = { courseTitle, courseCode, courseYear, courseSemester, courseDescription, _id }
        console.log("UPdated values");
        console.log(updatedValues);

        axios.put("http://localhost:5000/updateValues", { updatedValues })
            .then((res) => {
                if (res.status === 200) {
                    alert(res.data.message);
                    navigate("/CoursesList");
                }
                else {
                    throw new Error('Failed to update data on the server.');
                }
            })
            .catch((err) => { console.log("Their is a error the code") })
    }

    return (
        <div>

            {
                localStorage.isLoggedin && <Navbar />
            }
            <div className='w-1/2 m-auto relative top-28'>
                <form>
                    <div className='w-1/2 m-auto flex flex-col justify-center border rounded border-black border-0.3 px-5 py-10'>
                        <div className='px-5 py-2'>
                            <input className='border border-black rounded font-gray w-full px-3 py-2' type="text" placeholder={parentData.course.courseTitle} onChange={(e) => { SetCourseTitle(e.target.value) }} />
                        </div>
                        <div className='px-5 py-2'>
                            <input className='border border-black rounded font-gray w-full px-3 py-2' type="number" placeholder={parentData.course.courseCode} onChange={(e) => { SetCourseCode(e.target.value) }} />
                        </div>
                        <div className='px-5 py-2'>
                            <input className='border border-black rounded font-gray w-full px-3 py-2' type="number" placeholder={parentData.course.courseYear} min={1990} max={2024} onChange={(e) => { SetCourseYear(e.target.value) }} />
                        </div>
                        <div className='px-5 py-2'>
                            <input className='border border-black rounded font-gray w-full px-3 py-2' type="number" placeholder={parentData.course.courseSemester} min={1} max={10} onChange={(e) => { SetCourseSemester(e.target.value) }} />
                        </div>
                        <div className='px-5 py-2'>
                            <textarea className='border border-black rounded font-gray w-full px-3 py-2' placeholder={parentData.course.courseDescription} name="" id="" cols="10" rows="3" onChange={(e) => { SetCourseDescription(e.target.value) }}></textarea>
                        </div>
                        <div className='px-5 py-2'>
                            <button onClick={handleSubmit} className='w-25 justify-center w-full rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5' type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update