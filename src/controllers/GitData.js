import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const GitData = asyncHandler(async(req , res)=>{
      const response = await fetch(`https://api.github.com/users/Arpit2singh`) ;
      const data = await response.json() ; 
      if(!data){
        throw new ApiError(401, "error while fetching the gfg data ") ; 
      }
      console.log(data) ; 
      res.status(201).json(new ApiResponse(201 , "data is fetched from the gfg", data)) ; 
    
})

export default GitData ; 