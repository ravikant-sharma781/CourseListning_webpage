import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('isLoggedin', 'false');
        navigate('/Login');
        window.location.reload();
    };

    return (
        <div>
            <div className='mx-auto'>
                <div className='flex w-3/4 space-x-20 justify-around m-auto text-base border p-3 border-t-[0px] border-l-[0px] border-r-[0px] border-b-[2px] border-gray-300'>
                    <div className='text-green-600'>
                        <Link to='/Home' className='font-bold'>LoGo</Link>
                    </div>
                    <div className=''>
                        <Link to='/Home' className='hover:text-green-600'>Home</Link>
                    </div>
                    <div className='flex space-x-10 font-medium'>
                        <div className=''>
                            <Link to="/Login" className='hover:text-green-600'>Login</Link>
                        </div>
                        <div className=''>
                            <Link to="/Signup" className='hover:text-green-600'>SignUp</Link>
                        </div>
                        <div>
                            |
                        </div>
                        <div className=''>
                            <button onClick={handleLogout} className='hover:text-green-600'>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
