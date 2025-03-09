import express  from "express";
import {Equipment, Vehicle} from "@prisma/client";
import {deleteVehicle, getAllVehicles, getSelctedVehicle, saveVehicle, updateVehicle} from "../database/Vehicle-data";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

router.post("/add", async (req: express.Request, res: express.Response) => {
    const vehicle: Vehicle = req.body;

    try {
        const isSave = await saveVehicle(vehicle);
        res.send(isSave);
    }catch(err) {
        res.status(400).send({})
    }
})

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const getVehicles = await getAllVehicles();
        res.json(getVehicles);
    }catch (err){
        console.log("error getVehicles",err);
        res.status(400).send({})
    }
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    try {
        const getVehicle = await getSelctedVehicle(id)
        res.json(getVehicle);
    }catch (err){
        res.status(400).send({})
    }
})

router.delete('/delete/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    try {
        const isDelete = await deleteVehicle(id);
        res.send(isDelete);
    }catch (err){
        res.status(400).send({})
    }
})

router.put('/update/:id', async (req: express.Request, res: express.Response) => {
    const vehicle: Vehicle = req.body;

    try {
        const isUpdateVehicle = await updateVehicle(vehicle);
        res.send(isUpdateVehicle + "Update Successfully");
    } catch (err) {
        res.status(400).send({})
    }
})
export default router;