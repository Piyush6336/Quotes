import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Button, Stack, TextField,Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
// import Welcome from "./welcome";

function Login() {
  const { enqueueSnackbar } = useSnackbar();
//   const[name,setname]=useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
//   const [confirmpassword, setConfirmPassword] = useState("");
  const login=async(e)=>{
    e.preventDefault();
    if(!validInput()){
        return;
    }
    try {
        const response = await axios.post(`http://localhost:8082/login`, {
            username,
            password,
        }, { withCredentials: true });
    
        if (response.status === 201) {
            enqueueSnackbar("Login successful!", { variant: "success" });
            // Navigate to the quotes page, passing the name as state if needed
            navigate("/quotes");
        }
    } catch (error) {
        // Check if error response exists to avoid "undefined" errors
        if (error.response) {
            const statusCode = error.response.status;
    
            if (statusCode === 404) {
                enqueueSnackbar('User not found, redirecting to registration...', { variant: 'warning' });
                // Redirect to the registration page if user is not found
                navigate('/register');
            } else if (statusCode === 401) {
                enqueueSnackbar('Invalid credentials, please try again', { variant: 'error' });
            } else {
                enqueueSnackbar(`Error ${statusCode}: Something went wrong, please try again`, { variant: 'error' });
            }
        } else if (error.request) {
            // Network or request issue
            enqueueSnackbar('No response from server. Please check your connection and try again.', { variant: 'error' });
        } else {
            // Other unexpected errors
            enqueueSnackbar('An unexpected error occurred. Please try again.', { variant: 'error' });
            console.error('Error:', error.message); // Optional: Log for debugging
        }
    }
    

  }
  const validInput=()=>{
    // const {username,passsword,confirmpassword}=data;
    if(!username){
        enqueueSnackbar("username is a required field",{variant:"warning"});
        // alert("username is required");
        return false;
    }
    if(!password){
        enqueueSnackbar("Password is required",{variant:"warning"});
        // alert("Password is required");
        return false;
    }
    return true;
  }

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 }, maxWidth: 400, margin: "auto", }}>
        <Typography variant="h5" align="center" sx={{
          mb: 2,
          background: "linear-gradient(45deg, #00b09b, #96c93d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 'bold',
        }}>
        “Welcome Back! Let’s Get You Logged In.”
      </Typography>
      <Stack spacing={2}>
        <form onSubmit={login}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            name="username"
            placeholder="Enter Username"
            required
            fullWidth
            value={username} // Bind to state
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
                style: { color: 'white' }, // Change text color to white
              }}
              InputLabelProps={{
                style: { color: 'white' }, // Change label color to white
              }}
          />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            name="password"
            placeholder="Enter Password"
            required
            fullWidth
            type="password"
            value={password} // Bind to state
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
                style: { color: 'white' }, // Change text color to white
              }}
              InputLabelProps={{
                style: { color: 'white' }, // Change label color to white
              }}
          />
         
          <Button type="submit" fullWidth >Login Now </Button>
        </form>
        <p className="secondary-action">
          Don't have an account?{" "}
          <Link className="register" to="/register">
            Register here
          </Link>
        </p>
      </Stack>
    </Box>
  );
}
export default Login;