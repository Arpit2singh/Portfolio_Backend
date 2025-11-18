import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({

    name : {
        type : String , 
        required : true
    } ,
    email : {
        type : String , 
        required : true ,
    } , 
    query : {
        type : String , 
        required :true ,
    }

})

export const PortfolioSchema = mongoose.model("PortfolioSchema" , feedbackSchema ) ; 