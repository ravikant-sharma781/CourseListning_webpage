import express from "express";
import cors from 'cors';
import mongoose from "mongoose";

import signupSchema from './Models/signup.js';
import courseSchema from './Models/course.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Users");

// login
app.post('/Login', (req, res) => {
    const { email, password } = req.body;
    signupSchema.findOne({ email: email })
        .then((user) => {
            if (user === null) {
                res.send({ message: "User not Exist", user });
            }
            else {
                if (password == user.password) {
                    res.send({ message: "Login sucessfful", user });
                }
                else {
                    res.send({ message: "Wrong password", user });
                }

            }
        })
        .catch((err) => { res.send(err) })

})

// signup
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    //if user is already registered then no need to signup
    signupSchema.findOne({ email: email })
        .then((user) => {
            if (user === null) {
                res.send({ message: "Signup success Login to continue" })
                const new_user = new signupSchema({
                    email,
                    password
                })
                new_user.save()
                    .then(() => {
                        res.send({ message: "Signup success Login to continue" });
                    })
                    .catch((err) => {
                        console.error("Error saving new user:", err);
                        res.status(500).send({ message: "Internal Server Error" });
                    });

            }
            else {
                res.send({ message: "User Already exist" });
            }
        })
        .catch((err) => { alert(err) })
})


// courses
app.post('/NewCourse', (req, res) => {
    const { courseTitle, courseCode, courseDescription, courseYear, courseSemester } = req.body;
    courseSchema.findOne({ courseCode: courseCode })
        .then((course) => {
            if (course === null) {
                const new_course = new courseSchema({ courseTitle, courseCode, courseDescription, courseYear, courseSemester })
                new_course.save();
                res.send({ message: "Course added successffuly", new_course });
            }
            else {
                res.send({ message: "Course already exist with same Id" });
            }
        })
        .catch((err) => { res.send(err) })

})


app.get('/courses', (req, res) => {

    courseSchema.find({})
        .then(items => res.json(items))
        .catch(err => res.json(err));
})


app.post('/deleteCourse', (req, res) => {
    const { courseID } = req.body;
    console.log(courseID);
    courseSchema.deleteOne({ _id: courseID })
        .then(() => res.send({ message: "Course deleted successfully" }))
        .catch((err) => {
            console.error("Error deleting course:", err);
            res.status(500).send({ message: "Internal Server Error" });
        });

})


app.put('/updateValues', (req, res) => {
    const { _id, courseTitle, courseCode, courseSemester, courseYear, courseDescription } = req.body.updatedValues;
    // console.log(courseTitle);
    courseSchema.findOne({ _id: _id })
        .then((updatedCourse) => {
            updatedCourse.courseTitle = courseTitle;
            updatedCourse.courseCode = courseCode;
            updatedCourse.courseSemester = courseSemester;
            updatedCourse.courseYear = courseYear;
            updatedCourse.courseDescription = courseDescription;
            // Save the updated course
            return updatedCourse.save();
        })
        .then(() => {
            res.status(200).send({ message: "Course updated" });
        })
        .catch((err) => {
            console.error("Error updating course:", err);
            res.status(500).send({ message: "Error updating course" });
        });
})


app.listen(PORT, () => {
    console.log(`The server is live at http://localhost:${PORT}`);
})
