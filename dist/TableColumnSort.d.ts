import React from 'react';
import './TableColumnSort.css';
interface Sort {
    orderBy: string;
    ascending: boolean;
}
interface ContainerProps {
    sort: Sort;
    columnName: string | null;
    callback: Function;
}
declare const TableColumnSort: React.FC<ContainerProps>;
export default TableColumnSort;
