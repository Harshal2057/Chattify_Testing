import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router";

//Loacal Imports
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

//zustand
import { authStore } from "./store/authStore";




function App() {

  const{checkAuth , authUser } = authStore();
 
    const location = useLocation();

    useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <div className="h-screen w-full flex flex-col ">

                      {/* NAVBAR */}
                      {!["/login" , "/profile"].includes(location.pathname) &&  <Navbar /> }
               
        <div className="flex-1 overflow-hidden">
                <Routes>
          <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ?  <Navigate to="/" /> :<Login />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
        </div>
  

<Toaster />
    </div>
  )
}

export default App
