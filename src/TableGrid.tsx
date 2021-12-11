import { IonCheckbox } from '@ionic/react'

import { Sort } from './models/Sort'
import UtilsService from './services/utils.service'
import { TableColumnSort } from './TableColumnSort'

import './TableGrid.css'

interface ContainerProps {
	rows: any[];
	headers?: any[];
    rowClick?: Function;
	sort?: Sort;
	changeSortCallback?: Function;
	sortableColumns?: (string|null)[];
	headerStyle?: object;
	rowStyle?: object;
	changeCheckboxesCallback?: Function;
	maxColumnWidth?: number;
}

const checksObj: any = {};
let checkedKeys: string[] = [];

export const TableGrid: React.FC<ContainerProps> = ({ rows, headers, rowClick, sort, changeSortCallback, sortableColumns, headerStyle, rowStyle, changeCheckboxesCallback, maxColumnWidth }) => {
	const utilsService = UtilsService.getInstance(maxColumnWidth);
	const keys = Object.keys(rows[0] || [])
	// const { gridWidth, columnWidths } = utilsService.getGridWidths(rows, headers)
	return (
		// <div style={{ height: '100%', overflow: 'scroll' }}>
		<div className="scroll-y">
		<div className="scroll-x">
			<div className="content-container" style={{  }}>			
			<table style={{  }} key={utilsService.randomKey()}>
				<tbody>
					<tr key={utilsService.randomKey()}>
						{keys.map((keyname, index) => keyname !== 'HIDDEN' ? (
							<td
								style={{ verticalAlign: 'bottom',  ...headerStyle }}
								className='breakItUp TableGrid-header'
								key={utilsService.randomKey()}>
								{rows[0][keyname]?.TYPE === 'IMAGE' && 
									(headers ? headers[index] || '' : '')
								}
								{rows[0][keyname]?.TYPE !== 'IMAGE' && 
									(headers ? headers[index] || '' : keyname)
								}
								{/* { (typeof rows[0][keyname] === 'object' && rows[0][keyname].TYPE === 'IMAGE') ? '' : keyname } */}
								{sort && changeSortCallback && sortableColumns && typeof sortableColumns[index] === 'string' &&  						
									<TableColumnSort sort={sort} columnName={sortableColumns[index]} callback={changeSortCallback}/>
								}
							</td>
						): null)}
					</tr>
					{rows.map((row, index) => (
						<tr key={utilsService.randomKey()} 
							onClick={() => {
								rowClick ? rowClick(row, index) : {};
								console.log('checksObj', checksObj);
							}}>
							{keys.map((key/*, index*/) => {
								// if (!Array.isArray(row[key])) {
									// hande key === 'HIDDEN' here...
								if (key === 'HIDDEN') {
									return null;
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
														checked={row[key].value || row[key].checked}
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
