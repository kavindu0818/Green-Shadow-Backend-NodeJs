import express from "express";
import {Field} from "../model/Field";
import {FieldAdd} from "../database/Field-data";

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

export default router;