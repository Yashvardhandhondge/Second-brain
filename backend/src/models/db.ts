//It's am db,ts file for storing users and the brain (i.e) ideas tweets and video from youtube user wants to store
import mongoose from "mongoose";
import { ObjectId } from "mongoose";
//user Schema 

const UserSchema = new mongoose.Schema({
    email : {type : String , required : true, unique : true},
    password : {type : String , required : true},
    username : {type : String , required : true},
    image : {type : String },
})

// user model

export const User = mongoose.model("User",UserSchema)



