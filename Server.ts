import express from "express";
import {Field} from "./model/Field";
import FieldRouter from "./routes/Field-router";
import cors = require('cors');
import CropRouter from "./routes/Crop-router";


const app=express();
app.use(express.json());
app.use(cors())


app.use('/field', FieldRouter)
app.use('/crop', CropRouter)

app.listen(3000,(err)=>{
    console.log("Server running on port 3000")
})