import express from "express";
import {Crop} from "../model/Crop";
import {deleteCrop, getAllCrops, getSelctedCrop, saveCrop, updateCrop} from "../database/Crop-data";


const router = express.Router();

router.post("/add", async (req: express.Request, res: express.Response) => {
    const newCrop:Crop = req.body;

    console.log(newCrop);

    try {
        const isSaveCrop = await saveCrop(newCrop);
        res.send(isSaveCrop);
    }catch(err) {
        console.log("error adding Crop",err);
        res.status(400).send({})
    }
})

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const getCrops = await getAllCrops();
        res.json(getCrops);
    }catch (err){
        console.log("error getCrops",err);
        res.status(400).send({})
    }
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    try{
        const getCrop = await getSelctedCrop(id);
        res.json(getCrop);
    }catch(err){
        console.log("error getCrop",err);
        res.status(400).send({})
    }
})

router.put('/update/:id', async (req: express.Request, res: express.Response) => {
    const crop:Crop = req.body;

    try {
        const isUpdateCrop = await updateCrop(crop);
        res.send(isUpdateCrop + "Update Successfully");
    }catch (err){
        res.status(400).send({})
    }
})

router.delete('/delete/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        const isDeleteCrop = await deleteCrop(id);
        res.send(isDeleteCrop + "Delete Successfully");
    }catch (err){
        res.status(400).send({})
        // return("Deleting not Successfully");
    }
})
export default router;