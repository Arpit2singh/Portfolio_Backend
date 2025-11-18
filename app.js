import express, { urlencoded } from "express" ; 
import router from "./src/routes/route.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import visitedUser from "./src/middleware/visit.middleware.js";
import UserInfo from "./src/middleware/userinfo.middleware.js";
//v 
const app = express() ; 
app.use(cors({
    origin : process.env.CORS_ORIGIN ,
    credentials : true 
}))
const startTime  = Date.now()  ; 
app.use(cookieParser()) ; 

app.use(express.urlencoded({extended : true  , limit : "16kb"})) ; 
app.use(express.json({limit : "16kb"})) 
// app.use(UserInfo)
// app.use(visitedUser)

app.use("/portfolio" , router) ;
app.set("trust proxy", true);

// window.addEventListener("beforeunload", ()=>{
//     const endTime  = Date.now() ; 
//     const timeSpend = endTime - startTime ; 
//     // after calculating the time it is send to the backend with the visitorID and then store it on the backend 
//     console.log(timeSpend)
// })



export default app ; 