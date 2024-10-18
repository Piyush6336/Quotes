import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Button, Stack, TextField,Typography } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
function Registration() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate();
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const register=async(e)=>{
    e.preventDefault();
    if(!validInput()){
        return;
    }
    try {
        setLoading(true);
        const response = await axios.post(`http://localhost:8082/register`,{
            name,
            username,
            password,
        });
        if(response.status===201){
            enqueueSnackbar("Registration successful!", { variant: "success" });
            // alert("Registration Successful!");
            navigate("/login");
        }
    } catch (error) {
        if (error.response) {
          enqueueSnackbar(error.response.data.message || "Registration failed. Please try again.", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Something went wrong. Please try again later.", {
            variant: "error",
          });
        }
        console.error("Registration Error:", error);
      } finally {
        setLoading(false); // Enable button after request completes
      }
    };

  
  const validInput=()=>{
    // const {username,passsword,confirmpassword}=data;
    if(!username){
        enqueueSnackbar("username is a required field",{variant:"warning"});
        // alert("username is required");
        return false;
    }
    if(username.length<5){
        enqueueSnackbar("username must be atleast 5 characters",{variant:"warning"});
        // alert("username is short");
        return false;
    }
    if(!password){
        enqueueSnackbar("password is a required field",{variant:"warning"});
        // alert("password is requied");
        return false;
    }
    if(password.length<6){
        enqueueSnackbar("password must be atleast 6 characters",{variant:"warning"});
        // alert("password is short");
        return false;
    }
    if(password!==confirmpassword){
        enqueueSnackbar("password do not match",{variant:"warning"});
        // alert("password doesn't match");
        return false;
    }
    return true;
  }

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 }, maxWidth: 400, margin: "auto" }}>
        <Typography variant="h4" align="center" sx={{
          mb: 2,
          background: "linear-gradient(45deg, #ff0080, #ff8c00, #8b00ff, #00bfff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 'bold',
        }}>
        “Join the Adventure! Sign Up Today!”
      </Typography>
      <Stack spacing={2}>
        <form onSubmit={register}>
        <TextField
            id="name"
            label="name"
            variant="outlined"
            name="name"
            placeholder="Enter Name"
            required
            fullWidth
            value={name} // Bind to state
            onChange={(e) => setname(e.target.value)}
            InputProps={{
                style: { color: 'white' }, // Change text color to white
              }}
              InputLabelProps={{
                style: { color: 'white' }, // Change label color to white
              }}
          />
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
          <TextField
            id="Confirm password"
            label="Confirm password"
            variant="outlined"
            name="Confirm password"
            placeholder="Enter Confirm password"
            required
            fullWidth
            type="password" // Make it a password field
            value={confirmpassword} // Bind to state
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
                style: { color: 'white' }, // Change text color to white
              }}
              InputLabelProps={{
                style: { color: 'white' }, // Change label color to white
              }}
          />
           <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Registering..." : "Register Now"}
          </Button>
        </form>
        <p className="secondary-action">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login here
          </Link>
        </p>
      </Stack>
    </Box>
  );
}
export default Registration