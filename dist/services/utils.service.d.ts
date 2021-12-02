export declare class UtilsService {
    constructor();
    uuidv4: () => string;
    randomKey: () => string;
    getTextWidth: (text: string, font?: string | undefined) => number;
    getGridWidths: (obj: any) => {
        gridWidth: number;
        columnWidths: number[];
    };
}
