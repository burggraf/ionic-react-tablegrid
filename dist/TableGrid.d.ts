/// <reference types="react" />
import { Sort } from './models/Sort';
import './TableGrid.css';
interface ContainerProps {
    rows: any[];
    setRows?: any;
    headers?: any[];
    rowClick?: Function;
    sort?: Sort;
    headerStyle?: object;
    rowStyle?: object;
    changeCheckboxesCallback?: Function;
    maxColumnWidth?: number;
}
export declare const TableGrid: React.FC<ContainerProps>;
export {};
