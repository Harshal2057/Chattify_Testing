import express from  "express";
import { getAllUsers , getMessages , sendMessage } from "../controller/message.js";
import protectedRoute from "../middleware/protectedRoute.js";

const messageRoutes = express.Router();

messageRoutes.get("/getUsers" , protectedRoute , getAllUsers);
messageRoutes.get("/getMessages/:id", protectedRoute , getMessages);
messageRoutes.post("/sendMessage/:id", protectedRoute , sendMessage);

export default messageRoutes;

