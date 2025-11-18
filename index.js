
import dotenv from "dotenv"
import dbLogic from "./src/db/db.js"
import app from "./app.js"
dotenv.config({
    path: "./.env"
})


dbLogic().then(

    app.listen(process.env.PORT, () => {
        console.log("app is listening on the port ", process.env.PORT);

    })
).catch((error) => {
    console.log("db not connected ", error)
})