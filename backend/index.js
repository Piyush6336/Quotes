const express= require("express");
const app=express();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const User=require('./usermodel');
const bcrypt = require('bcrypt');
const PORT=8082;
app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.31.103:3000','https://3841-2409-40d0-1131-20f1-6cab-8d11-3cb3-d780.ngrok-free.app','https://quotes-3fktp1o30-piyush-aryas-projects.vercel.app'],
    methods: ['GET', 'POST'], // Replace with your client URL
    credentials: true, // This allows cookies to be sent
}));

app.use(express.json());
app.use(cookieParser()); 
app.post("/register",async(req,res)=>{
    const {name,username,password}=req.body;
    if (!name || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user and save to the database
        const newUser = new User({name, username, password:hashedPassword });
        console.log(newUser);
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});
app.post("/login",async(req,res)=>{
    const { username, password } = req.body;
    // console.log(res.status);

    // Check if the user exists in the database
    try {
      const user = await User.findOne({ username });
  
      // If user does not exist, respond with a message
      if (!user) {
        return res.status(404).json({ message: 'User not found. Redirect to registration.' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
    //   if (!password) {
    //     return res.status(401).json({ message: 'Invalid password' });
    // }
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }
      res.cookie('user', username, { httpOnly: true, secure: false, path:'/' });
      console.log(req.cookies);
      return res.status(201).json({ message: 'Login successful',name:user.name });
    }catch(error){
        res.status(500).json({ message: 'Error during login', error });
    }
});
app.post("/logout", (req, res) => {
    console.log("Cookies before clearing:", req.cookies);
    res.clearCookie('user',{path:'/'}); // Clear the user cookie
    console.log("Cookies after clearing:", req.cookies);
    res.status(201).json({ message: 'Logout successful' });
    // console.log(req.clearCookies,"cookieClear");
  });
  
app.listen(PORT,()=>{
    console.log("Listening at",PORT);
})