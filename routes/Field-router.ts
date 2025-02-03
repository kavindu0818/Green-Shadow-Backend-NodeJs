import express from "express";
import {Field} from "../model/Field";
import {deleteField, FieldAdd, getAllField, getSelectedField, updateField} from "../database/Field-data";

const router = express.Router();

router.post("/add", (req: express.Request, res: express.Response) => {
    const field: Field = req.body;

    try {
        const addField =  FieldAdd(field);
        res.send(addField);
    }catch(err) {
        console.log("error adding Field",err);
        res.status(400).send({})
    }
})

router.get("/:fieldCode", async (req: express.Request, res: express.Response) => {
    const field = req.params.fieldCode;

    try {
        const fieldData = await getSelectedField(field);
        console.log("Field Data", fieldData);
        res.json(fieldData);


    } catch (err) {
        console.log("error getField", err);
        res.status(400).send({})
    }
})

router.get("/", async (req: express.Request, res: express.Response) => {

    try {
        const fieldAllData = await getAllField();
        console.log("Field All Data", fieldAllData);
        res.json(fieldAllData);
    }catch(err) {
        console.log("error getAllField", err);
        res.status(400).send({})
    }
})

router.delete("/delete/:fieldCode", async (req: express.Request, res: express.Response) => {
    const field = req.params.fieldCode;

    try {
        const isDeleteField = await deleteField(field);
        console.log("Field Delete Data", isDeleteField);
        res.send(isDeleteField);
    } catch (err) {
    }
    res.status(400).send({})
})

router.put("/update/:fieldCode", async (req: express.Request, res: express.Response) => {
    const field: Field = req.body;
    try {
        const isUpdateField = await updateField(field);
        console.log("Field Update Data", isUpdateField);
        res.send(isUpdateField);
    }catch(err) {
        console.log("error updating field", err);
        res.status(400).send({})
    }
})
export default router;