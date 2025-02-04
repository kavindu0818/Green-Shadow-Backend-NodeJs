import { Field } from "../model/Field";
import { PrismaClient } from "@prisma/client";
import fs from 'fs';  // For file system handling (optional, based on your storage method)

const prisma = new PrismaClient();

export async function FieldAdd(f: Field) {
    try {
        const newField = await prisma.field.create({
            data: {
                fieldCode: f.fieldCode,
                fieldName: f.fieldName,
                fieldLocation: f.fieldLocation,
                fieldSize: f.fieldSize,
                fieldImage: f.fieldImage || '',  // Use an empty string if no image
            }
        });

        console.log("Field Add", newField);
        return newField;
    } catch (err) {
        console.log("Error adding field", err);
    }
}

export async function getSelectedField(field: string) {
    try {
        return await prisma.field.findUnique({
            where: { fieldCode: field }, // Ensure "code" is the correct column name
        });
    } catch (err) {
        console.error("Error getting field from database:", err);
        return null;
    }
}

export async function getAllField() {
    try {
        return await prisma.field.findMany();
    } catch (err) {
        console.error("Error getting field from database:", err);
        return ("not Field");
    }
}

export async function deleteField(field: string) {
    try {
        return await prisma.field.delete({
            where:{
                fieldCode: field
            }
        })
    }catch (err){
        console.error("Error deleting field", err);
        return ("Not deleted field");
    }
}

export async function updateField(f: Field){
    try {
        return await prisma.field.update({
           where:{fieldCode:f.fieldCode},
            data:{
                fieldCode: f.fieldCode,
                fieldName: f.fieldName,
                fieldLocation: f.fieldLocation,
                fieldSize: f.fieldSize,
                fieldImage: f.fieldImage || '',
            }
        })
    }catch (err){
        return ("Not updated field");
    }
}