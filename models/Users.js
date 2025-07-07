import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    photo: String

}, {timestamps: true})

export default mongoose.model('User', userSchema)