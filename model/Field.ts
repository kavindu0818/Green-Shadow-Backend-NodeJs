export class Field{
    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: string;
    fieldImage: File | null;


    constructor(
        fieldCode: string,
        fieldName: string,
        fieldLocation: string,
        fieldSize: string,
        fieldImage: File | null,

    ) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldSize = fieldSize;
        this.fieldImage = fieldImage;
    }
}
