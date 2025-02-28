import express from "express";
import {Field} from "./model/Field";
import FieldRouter from "./routes/Field-router";
import cors = require('cors');
import CropRouter from "./routes/Crop-router";
import StaffRouter from "./routes/Staff-router";
import EquipmentRouter from "./routes/Equipment-router";
import VehicleRouter from "./routes/Vehicle-router";
import UserRouter, {authenticateToken} from "./routes/User-router";
// import UserRouter from "./routes/User-router";


const app=express();
app.use(express.json());
// app.use(cors())

const allowedOrigin = 'http://localhost:5173';

const corsOptions = {
    origin: allowedOrigin,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));


app.use('/field', FieldRouter)
app.use('/crop', CropRouter)
app.use('/staff', StaffRouter)
app.use('/equ', EquipmentRouter)
app.use('/veh', VehicleRouter)
app.use('/user', UserRouter)

app.use(authenticateToken);


app.listen(3000,(err)=>{
    console.log("Server running on port 3000")
})