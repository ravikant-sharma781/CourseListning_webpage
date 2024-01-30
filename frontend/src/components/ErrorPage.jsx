import React from 'react'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function ErrorPage() {

    return (

        <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-green-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                <div>
                    <Link to="/Home" element={<Home />}><button className='flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-10 mx-28'>Go back to home page</button></Link>
                </div>
            </div>

        </div>
    )
}

export default ErrorPage
