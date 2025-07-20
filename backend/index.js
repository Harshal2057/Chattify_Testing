import express from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import cors from "cors"

import path from "path"

//local imports
import {dbConnect} from "../backend/config/database.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import cloudinaryConnect from "./config/cloudinary.js"
import messageRoutes from "./routes/message.routes.js"

//Socket
import {app , server} from "./config/socket.js"


dotenv.config()


dbConnect();
cloudinaryConnect();

const PORT = process.env.PORT;

const __dirname = path.resolve()

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))



//ROUTES
app.use("/api/auth" , authRouter);
app.use("/api/messageroutes" , messageRoutes);

app.get("/" , (req , res) => {
    return res.send("<h1>Chattify</h1>")
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/Chattify/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "Chattify" ,"dist", "index.html"));
  });
}

server.listen(PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`);
    
})