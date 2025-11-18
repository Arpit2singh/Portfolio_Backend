import { v4 as uuidv4 } from "uuid" ;
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";


const visitedUser = asyncHandler(async(req , res , next)=>{
   
    try {
      
        let visitorId = req.cookies.visitorId ; 
        let visitCount = req.cookies.visitCount ; 

        if(!visitorId) {
            // throw new ApiError(401 , "VisitorID not found ") ; 
            visitorId = uuidv4();
            visitCount = 1 ;    
        }
        else{
           visitCount = Number(visitCount) +1 ;
         }

        const options ={
            httpOnly : true , 
            maxAge : 1000 * 60 * 60 * 24 * 365 
        }

        res.cookie("visitorId" , visitorId , options) ;
        res.cookie("visitCount" , visitCount , options);

        req.visitor = {visitorId , visitCount} ; 
           console.log("Visitor Data:", req.visitor);
           next() ;

        
    } catch (error) {
        throw new ApiError(401 , "not able to track the user by visit middleware")
    }

})

export default visitedUser ; 