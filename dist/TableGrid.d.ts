/// <reference types="react" />
import { Sort } from './models/Sort';
import './TableGrid.css';
interface ContainerProps {
    rows: any[];
    headers?: any[];
    rowClick?: Function;
    sort?: Sort;
    changeSortCallback?: Function;
    sortableColumns?: (string | null)[];
    headerStyle?: object;
    rowStyle?: object;
    changeCheckboxesCallback?: Function;
    maxColumnWidth?: number;
}
export declare const TableGrid: React.FC<ContainerProps>;
export {};
