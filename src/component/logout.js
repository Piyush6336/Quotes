import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Logout() {
  const navigate = useNavigate();

   const handleLogout=async()=>{
    try {
        const response= await axios.post('http://localhost:8082/logout',{}, { withCredentials: true });
        if(response.status===201){
            navigate('/login');
        }
    } catch (error) {
        alert("error",error);
    }
   }
   return (
    <button onClick={handleLogout}>Logout</button>
);
}

export default Logout;
