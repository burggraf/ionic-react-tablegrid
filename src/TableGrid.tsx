import { IonCheckbox } from '@ionic/react'

import { Sort } from './models/Sort'
import UtilsService from './services/utils.service'
import { TableColumnSort } from './TableColumnSort'
import './TableGrid.css'

import { useEffect, useState } from 'react'

interface ContainerProps {
	rows: any[];
	headers?: any[];
    rowClick?: Function;
	sort?: Sort;
	// changeSortCallback?: Function;
	// sortableColumns?: (string|null)[];
	headerStyle?: object;
	rowStyle?: object;
	changeCheckboxesCallback?: Function;
	maxColumnWidth?: number;
}

const checksObj: any = {};
let checkedKeys: string[] = [];
let initialized = false;

export const TableGrid: React.FC<ContainerProps> = ({ rows, headers, rowClick, sort, /*changeSortCallback, sortableColumns,*/ headerStyle, rowStyle, changeCheckboxesCallback, maxColumnWidth }) => {
	const utilsService = UtilsService.getInstance(maxColumnWidth);
	const keys = Object.keys(rows[0] || [])
	if (rows.length === 0) {
		return null;
	}
	const [displayRows, setDisplayRows] = useState(rows);
	const [currentSort, setCurrentSort] = useState<Sort>({ orderBy: sort?.orderBy || '', ascending: sort?.ascending || true });

	useEffect(() => {
		// updateDisplay
	},[displayRows]);

	// initialize checkboxes
	if (!initialized) {
		initialized = true;
		displayRows.map((row: any) => {
			keys.map((key) => {
				if (row[key]?.TYPE === 'CHECKBOX' && (row[key].checked || row[key].value)) {
					checkedKeys.push(row[key].id);
					checksObj[row[key].id] = true;
				}
			})
		});
	}

	const changeSortCallbackLocal = (sort: Sort) => {
		const newRows = [...displayRows];
		newRows.sort((a: any, b: any) => {
			const y = a[sort.orderBy].sort;
			const z = b[sort.orderBy].sort;
			if (y < z) {
				return sort.ascending ? -1 : 1
			}
			if (y > z) {
				return sort.ascending ? 1 : -1
			}			
			return 0
		});
		setDisplayRows(newRows);
		setCurrentSort(sort);
	}

	return (
		<div className="scroll-y">
		<div className="scroll-x">
			<div className="content-container" style={{  }}>			
			<table style={{  }} key={utilsService.randomKey()}>
				<tbody>
					<tr key={utilsService.randomKey()}>
						{keys.map((keyname, index) => {
							if (keyname.startsWith('$')) {
								return;
							} else {
								return (
									<td
										style={{ verticalAlign: 'bottom',  ...headerStyle }}
										className='breakItUp TableGrid-header'
										key={utilsService.randomKey()}>
										{displayRows[0][keyname]?.TYPE === 'IMAGE' && 
											(headers ? headers[index] || '' : '')
										}
										{displayRows[0][keyname]?.TYPE !== 'IMAGE' && 
											(headers ? headers[index] || '' : keyname)
										}
										{ displayRows[0][keyname]?.TYPE === 'CUSTOM' && displayRows[0][keyname]?.sort &&
											<TableColumnSort sort={currentSort} columnName={keyname} callback={changeSortCallbackLocal}/>
										}
									</td>
								)
						}})};
					</tr>
					{displayRows.map((row, index) => (
						<tr key={utilsService.randomKey()} 
							onClick={() => {
								rowClick ? rowClick(row, index) : {};
							}}>
							{keys.map((key/*, index*/) => {
								if (key.startsWith('$')) {
									return;
								}
								if (typeof row[key] !== 'object') {
									return (
										<td
											style={{  ...rowStyle || {}, ...row[key]?.cellStyle || {} }}
											className='breakItUp TableGrid-row'
											key={utilsService.randomKey()}>
											{row[key]}
										</td>
									)
								} else if (row[key] !== null && typeof row[key] === 'object' && row[key]?.TYPE) {
									switch (row[key]?.TYPE) {
										case 'CUSTOM':
											return (
												<td
													style={{  ...rowStyle || {}, ...row[key]?.cellStyle || {} }}
													className='breakItUp TableGrid-row'
													key={utilsService.randomKey()}>
														<div dangerouslySetInnerHTML={{"__html": row[key].html}} />
												</td>
											)
										case 'IMAGE':
											return (
												<td
													style={{  ...rowStyle || {}, ...row[key]?.cellStyle || {} }}
													className='breakItUp TableGrid-row'
													key={utilsService.randomKey()}>
													<img src={row[key].url} alt={row[key].alt || ''} style={...row[key].itemStyle}/>
												</td>
											)
										case 'CHECKBOX':
											return (
												<td 
													style={{ textAlign: 'center', paddingLeft: '15px', paddingRight: '15px', ...rowStyle || {}, ...row[key]?.cellStyle || {} }}
													className='breakItUp TableGrid-row'
													onClick={(e) => {e.stopPropagation()}}
													key={utilsService.randomKey()}>
													<IonCheckbox 
														mode="ios" 
														checked={checksObj[row[key].id]}
														onIonChange={(e) => {
															if(e.detail.checked) {
																checkedKeys.push(row[key].id);
																checksObj[row[key].id] = true;
															} else {
																checkedKeys = checkedKeys.filter(ck => ck !== row[key].id);
																checksObj[row[key].id] = false;
															}
															if (typeof changeCheckboxesCallback === 'function') {
																changeCheckboxesCallback(checkedKeys);
															}
														}} />
												</td>
											)
										case 'LINK':
											return (
												<td
													style={{  ...rowStyle || {} }}
													className='breakItUp TableGrid-row'
													key={utilsService.randomKey()}>
													<a href={row[key].URL} target='_blank'>{row[key].TEXT}</a>
												</td>
											)
										case 'LINK_BUTTON':
											return (
												<td
													style={{  ...rowStyle || {} }}
													className='breakItUp TableGrid-row'
													key={utilsService.randomKey()}>
													<a href={row[key].URL} target='_blank' className='TableGrid-linkButton'>{row[key].TEXT}</a>
												</td>
											)
										default:
											return (
												<td
													style={{  ...rowStyle || {}, ...row[key]?.cellStyle || {} } }
													className='breakItUp TableGrid-row'
													key={utilsService.randomKey()}>
													{JSON.stringify(row[key])}
												</td>
											)													
									}

								} else {
									return (
										<td
											style={{  ...rowStyle || {}, ...row[key]?.cellStyle || {} }}
											className='breakItUp TableGrid-row'
											key={utilsService.randomKey()}>
											{JSON.stringify(row[key])}
										</td>
									)
								}
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
		</div>
		</div>
	)
}

// export default TableGrid;
