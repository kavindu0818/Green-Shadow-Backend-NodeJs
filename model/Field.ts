export class Field{
    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: string;
    fieldImage: string | null;


    constructor(
        fieldCode: string,
        fieldName: string,
        fieldLocation: string,
        fieldSize: string,
        fieldImage:string| null,

    ) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldSize = fieldSize;
        this.fieldImage = fieldImage;
    }
}
