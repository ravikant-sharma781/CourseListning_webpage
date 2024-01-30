import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Signup, Login, ErrorPage, CoursesList, NewCourse, Update, Navbar } from './components/index';

const App = () => {
  const isLoggedIn = localStorage.getItem('isLoggedin') === true;
  return (
    <Router>
      {console.log(localStorage.isLoggedin)}
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home />} />
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Courseslist' element={<CoursesList />} />
        <Route path='/NewCourse' element={<NewCourse />} />
        {/* <Route path='/Newinstance' element={<NewInstance />} /> */}
        <Route path='/Courseslist/Update' element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
