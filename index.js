import express from "express";
import mongoose from "mongoose";


const app=express();
const port=5500;


app.listen(port,() =>{console.log("server started");})