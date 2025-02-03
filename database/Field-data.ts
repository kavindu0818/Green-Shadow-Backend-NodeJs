import { Field } from "../model/Field";
import { PrismaClient } from "@prisma/client";
import fs from 'fs';  // For file system handling (optional, based on your storage method)

const prisma = new PrismaClient();

export async function FieldAdd(f: Field) {
    try {
        // If the image is a file, convert it to a Base64 string
        let fieldImage: string = '';

        if (f.fieldImage) {
            // If the image exists, convert it to a Base64 string
            const buffer = await f.fieldImage.arrayBuffer();
            fieldImage = `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`;
        }

        // Handle null fieldImage case (if no image is provided, assign an empty string or default value)
        const newField = await prisma.field.create({
            data: {
                fieldCode: f.fieldCode,
                fieldName: f.fieldName,
                fieldLocation: f.fieldLocation,
                fieldSize: f.fieldSize,
                fieldImage: fieldImage || '',  // Use an empty string if no image
            }
        });

        console.log("Field Add", newField);
        return newField;
    } catch (err) {
        console.log("Error adding field", err);
    }
}
