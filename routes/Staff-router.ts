import express from "express";
import {Staff} from "../model/Staff";
import {getAllStaffs, saveStaff} from "../database/Staff-data";

const router = express.Router();

router.post("/add", async (req, res) => {
    const staff:Staff = req.body;
    try{
        const isSaveStaff = await saveStaff(staff);
        res.send(isSaveStaff);
    }catch (err){
        res.status(400).send({})
    }
})

router.get("/", async (req: express.Request, res: express.Response) => {
    try {
        const getStaffs = await getAllStaffs();
        res.json(getStaffs);
    }catch (err){
        res.status(400).send({})
    }
})

export default router;