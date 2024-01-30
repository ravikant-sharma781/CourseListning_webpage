import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        courseTitle: {
            type: String,
            require: true,
            unique: true
        },
        courseCode: {
            type: Number,
            require: true,
            unique: true,
            maxLength: 7
        },
        courseDescription: {
            type: String,
            require: true,
        },
        courseYear: {
            type: Number,
            require: true,
            maxLength: 4
        },
        courseSemester: {
            type: Number,
            require: true,
            range: [1, 10]
        }

    }, { timestamps: true });


const Course = mongoose.model("Course", courseSchema);

export default Course;
