import express from "express";
import mongoose from "mongoose";
import path from "path";
import trainroute from "./routes/trains.js"
import flightroute from "./routes/flight.js";
import contactroute from "./routes/contact.js";
import homeroute from "./routes/home.js";
import triproute from "./routes/mytrips.js";
import auroute from "./routes/au.js";
import tosroute from "./routes/tos.js";
import suroute from "./routes/signup.js";


const app=express();
const port=6900;

app.use(express.urlencoded({extended:false}));

    // load ui in nodejs
app.set('view engine', 'ejs');
app.set("views" , path.resolve("./views"));

app.use(express.static(path.join('views')));

app.use('/views/index.ejs', homeroute);
app.use('/views/flights.ejs', flightroute);
app.use('/views/trains.ejs', trainroute);
app.use('/views/contact.ejs', contactroute);
app.use('/views/mytrips.ejs', triproute);
app.use('/views/au.ejs', auroute);
app.use('/views/tos.ejs', tosroute);
app.use('/views/signup.ejs', suroute);

app.listen(port,() =>{console.log("server started");})

// let attributes=document.querySelector("TrainsSchema");
// let attr=attributes.getAttribute("TrainsSchema");
// console.log(attr);