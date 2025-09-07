import express from "express"
import dotenv from "dotenv"
import  authroutes  from "./routes/authroutes.js"
import { DBconnection } from "./db/DB.js"
import Adminroutes from "./routes/Adminroutes.js"
import clientroutes from "./routes/clientroutes.js"
const app = express()
const PORT = process.env.PORT || 8000
dotenv.config()


// middleware 

app.use(express.json())
app.use(express.urlencoded({ extended: true })); // for form submissions

//db connections 

DBconnection(process.env.MONGO_DB)

// controllers of auth

app.use("/auth",authroutes)
app.use("/api",Adminroutes)
app.use("/api",clientroutes)

app.listen(PORT,()=>console.log("server started at",PORT))