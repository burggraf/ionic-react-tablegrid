export default class UtilsService {
    static myInstance: any;
    maxColumnWidth: number;
    static getInstance(maxColumnWidth?: number): any;
    constructor(maxColumnWidth?: number);
    uuidv4: () => string;
    randomKey: () => string;
    getTextWidth: (text: string, font?: string | undefined) => number;
    getGridWidths: (obj: any, headers?: any[] | undefined) => {
        gridWidth: number;
        columnWidths: number[];
    };
}
