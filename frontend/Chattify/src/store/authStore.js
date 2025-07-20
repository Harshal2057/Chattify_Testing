import {create} from "zustand";
import {axiosInstace} from "../lib/axios.js"
import toast from "react-hot-toast"
import {io} from "socket.io-client"
import { chatStore } from "./chatStore.js";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/"

export const authStore = create((set , get) => ({

authUser : null,
isLogginIn :false,
isSignUp : false,
isLoggingOut:false,
ischeckingAuth:false,
isUpdatingProfile:false,
socket:null,
onlineUsers:[],



login: async(data) => {
    set({isLogginIn:true});

    try {
        
        const res = await axiosInstace.post("/auth/logIn" , data);

        set({authUser:res.data})

        const currentUser = get().authUser;

        toast.success("User logged in successfully !!")

        get().connectSocket();

    } catch (error) {
         const errorMessage = error.response?.data?.message || "Something went wrong in login";
         toast.error(errorMessage);
    }finally{
         set({isLogginIn:false});
    }
},

signUp: async(data) =>{
    set({isSignUp:true});

    try {
        const res = await axiosInstace.post("/auth/signUp" , data);

        set({authUser:res.data});

        toast.success("User Signed up successully !!")

        get().connectSocket();

        chatStore.getState().getUser();
        
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong in signUp";
         toast.error(errorMessage);
    }finally{
        set({isSignUp:false});
    }
},

checkAuth: async() => {
    set({ischeckingAuth:true});

    try {
        const res = await axiosInstace.get("/auth/checkAuth");

        set({authUser:res.data});

        const currentUser = get().authUser;

        get().connectSocket();

    } catch (error) {
       const errorMessage = error.response?.data?.message || "Something went wrong in ccheckauth";
         toast.error(errorMessage);
        set({authUser:null});
    }finally{
        set({ischeckingAuth:false})
    }
},

logOut: async() => {
    set({isLoggingOut:true});

    try {
       await axiosInstace.post("/auth/logOut");

       set({authUser:null})

        toast.success("User logged out successfully")

        get().disconnectSocket();
    } catch (error) {
       const errorMessage = error.response?.data?.message || "Something went wrong in logout";
         toast.error(errorMessage);
    }
},

updateProfile: async(image) => {
        set({isUpdatingProfile:true});

        try {
            await axiosInstace.put("/auth/porfilePic" , image);

            toast.success("Photo uploaded successfully !!")
        } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong in updateProfile";
         toast.error(errorMessage);
        }finally{
            set({isUpdatingProfile:false})
        }
},

connectSocket: () => {
    // console.log("in connect socket ");
    
    const {authUser} = get();

    if (!authUser || get().socket?.connected) {
        return;
    }

    const newSocket = io(BASE_URL , {
        query:{
            userId:authUser.user._id
        }
    })
    newSocket.connect();

    set({socket:newSocket})

    newSocket.on("getOnlineUsers" , (userIds) => {
        set({onlineUsers:userIds})
    })

},

disconnectSocket: () => {
    const socket = get().socket;

    console.log("IN DISCONNECT SOCKET");

    if (socket?.connected) {
        socket.disconnect();
        set({ socket: null }); // ✅ Clear socket from Zustand state
        console.log("Socket disconnected");
    } else {
        console.log("No active socket to disconnect");
    }
}



}))