import express from "express";
import {Crop} from "../model/Crop";
import {getAllCrops, saveCrop} from "../database/Crop-data";


const router = express.Router();

router.post("/add", async (req: express.Request, res: express.Response) => {
    const newCrop:Crop = req.body;

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

export default router;