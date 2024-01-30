import mongoose from "mongoose";

const signupScheme = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "can't be blank"],
        unique: true
    },
    password: {
        type: String,
    }
}, { timestamps: true })

const Signup = mongoose.model("Signup", signupScheme);

export default Signup;