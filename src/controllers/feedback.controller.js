import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { PortfolioSchema } from "../Model/feedback.model.js";

const feedback = asyncHandler(async(req , res)=>{
  
    const {name ,  email , query} = req.body  ; 

    if(!name || ! email || !query){
        throw new ApiError(401 , "fields are missing ")
    }
    else{
        console.log("procedding") ; 
    }

    const user  = await PortfolioSchema.create({
        name , 
        query , 
        email ,
    }) 

    const userselected = await  PortfolioSchema.findById(user._id) ; 

    if(!userselected) throw new ApiError(401 , "data not be stored" ) ; 
    return res.status(201).json(new ApiResponse(201 , "data has been stored"))  ; 

})

export {feedback} ; 