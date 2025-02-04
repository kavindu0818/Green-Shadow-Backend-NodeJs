import express from "express";
import {Staff} from "../model/Staff";
import {deleteStaff, getAllStaffs, getSelectedStaff, saveStaff, updateStaff} from "../database/Staff-data";
import {updateField} from "../database/Field-data";


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

router.get("/:id", async (req: express.Request, res: express.Response) => {
    const staffCode = req.params.id;

    try {
        const getStaff = await getSelectedStaff(staffCode);
        res.json(getStaff);
    }catch (err){
        res.status(400).send({})
    }
})

router.delete("/delete/:id", async (req: express.Request, res: express.Response) => {
    const staffCode = req.params.id;

    try {
        const isDeleteStaff = await deleteStaff(staffCode);
        res.send(isDeleteStaff);
    }catch (err){
        res.status(400).send({})
    }
})

router.put("/update/:id", async (req: express.Request, res: express.Response) => {
    const staff: Staff = req.body;
    const staffCode = req.params.id;

    try {
        const updatedStaff = await updateStaff(staffCode, staff);
        if (!updatedStaff) {
            res.status(404).json({ message: "Staff not found or not updated" });
        }
        res.json(updatedStaff);
    } catch (err) {
        console.error("Error updating staff:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;