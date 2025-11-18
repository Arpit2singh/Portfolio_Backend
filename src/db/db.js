import mongoose from "mongoose";
import dotenv from "dotenv"


 
const dbLogic = async ()=>{
    try {
        const dbName = "portfolio" 
        console.log(process.env.URI)
        const connectionInstance = await mongoose.connect(`${process.env.URI}${dbName}`)
        if(connectionInstance){
            console.log("mongodb connected") ; 
            console.log("mongodb connected at the " , connectionInstance.connection.host) ; 
            return connectionInstance ;
        }

    } catch (error) {
        throw console.error("error is occurred ") ; 
        throw error  ; 
    }
}

export default dbLogic ; 