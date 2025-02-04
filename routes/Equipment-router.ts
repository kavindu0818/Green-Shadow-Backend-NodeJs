import express from 'express';
import {Equipment} from "@prisma/client";
import {
    deleteEquipment,
    getAllEquipments,
    getSelctedEquipmet,
    saveEquipment,
    updateEquipment
} from "../database/Equipment-data";


const router = express.Router();

router.post('/add', async (req: express.Request, res: express.Response) => {
    const equ:Equipment = req.body;

    try {
        const isSaveEquipment = await saveEquipment(equ);
        res.send(isSaveEquipment);
    }catch(err) {
        res.status(400).send({})
    }
})

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const getEquipments = await getAllEquipments();
        res.json(getEquipments);
    }catch (err){
        console.log("error getEquipments",err);
        res.status(400).send({})
    }
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    try {
        const getEquipment = await getSelctedEquipmet(id)
        res.json(getEquipment);
    }catch (err){
        res.status(400).send({})
    }
})

router.delete('/delete/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    try {
        const isDelete = await deleteEquipment(id);
        res.send(isDelete);
    }catch (err){
        res.status(400).send({})
    }
})

router.put('/update/:id', async (req: express.Request, res: express.Response) => {
    const equ:Equipment = req.body;

    try {
        const isUpdateEquipment = await updateEquipment(equ);
        res.send(isUpdateEquipment + "Update Successfully");
    }catch (err){
        res.status(400).send({})
    }
})
export default router;