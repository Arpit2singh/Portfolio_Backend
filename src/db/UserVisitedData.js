

import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";

const UserVistedSchema  = mongoose.Schema({
    
    ip : {
        type : String , 
    } , 
    location :{
        type : String ,
    } ,
     operating : {
        type : String , 
    } , 
     browser : {
        type : String , 
    } , 
     device : {
        type : String , 
    } , 
    calculateTime : {
        type : Number , 
    },
    visitorCookie : {
        type : String
    }, 
    visitorCount : {
        type : Number 
    }

})


export const UserVisited = mongoose.model("UserVisted" , UserVistedSchema) ; 