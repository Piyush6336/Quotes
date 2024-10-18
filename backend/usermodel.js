const express= require('express');
const mongoose= require('mongoose');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/users_db').then(()=>{
    console.log("connected to mongodb");
}).catch((error)=>{
    console.log('Error connecting to MongoDB:', error)
});

const userSchema=new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User=mongoose.model("user",userSchema);
module.exports=User;