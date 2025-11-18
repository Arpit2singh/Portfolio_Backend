import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import requestIp from "request-ip"
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite"
import { UserVisited } from "../db/UserVisitedData.js";
import mongoose from "mongoose"
import ApiResponse from "../utils/ApiResponse.js";
import {v4 as uuidv4} from "uuid"



const UserInfo = asyncHandler(async (req, res, next) => {

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
     

        const clientIp = requestIp.getClientIp(req);
        const userAgent = req.headers["user-agent"]
        const deviceInfo = new UAParser(userAgent).getResult();

        const userInfo = {
            ip: clientIp,
            location: "Unknown",
            operating: deviceInfo.os.name + " " + deviceInfo.os.version,
            browser: deviceInfo.browser.name + " " + deviceInfo.browser.version,
            device: deviceInfo.device.type || "desktop"
        }
        //after getting teh information print it on the console 

        console.log("user Location ")



        const locationData = geoip.lookup(clientIp); // no await needed
        if (locationData) {
            userInfo.location = `${locationData.city}, ${locationData.country}`;

        }

        console.log("===== User Info =====");
        console.log(userInfo);
        console.log("=====================");

        req.userInfo = userInfo

        // const visitor = req.visitor;



        // if(!UserDevice){
        //     throw new ApiError(401 , "user device details not found") ; 
        // }

        const existingVisitor = await UserVisited.findOne(
            {
                visitorCookie : visitorId
            }
        )
        if (!existingVisitor) {
            const UserDevice = await UserVisited.create({
                ip: userInfo.ip,
                location: userInfo.location,
                operating: userInfo.operating,
                browser: userInfo.browser,
                device: userInfo.device,
                visitorCookie: visitorId,
                visitorCount: 1,
            })
            
            const userDataCheck = await UserVisited.findOne({visitorCookie : visitorId});
            if(!userDataCheck){
                throw new ApiError(401 , "UserData not created") ; 
            }
            else{
                return res.json(new ApiResponse(201, "User created successfully"));
            }

        }
        else{

            const userAgainVisited = await UserVisited.findOneAndUpdate( { visitorCookie: visitorId }, {
                $set : {
                             visitorCount : visitCount 
                }
            }, {new : true})
            
            if(!userAgainVisited){
                throw new ApiError(401 , "user Again visited changes Failed" )
            }
            else{
                 return res.json(
                new ApiResponse(
                    200,
                    "User visit count updated successfully"
                )
            );
            }
        }



      return  next()

    } catch (error) {
        throw new ApiError(401, "cannot get teh information from thte user")
    }

})


export default UserInfo; 