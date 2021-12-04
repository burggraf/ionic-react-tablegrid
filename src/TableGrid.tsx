import React from 'react'

import { Sort } from './models/Sort'
import { UtilsService } from './services/utils.service'
import { TableColumnSort } from './TableColumnSort'

import './TableGrid.css'

interface ContainerProps {
	rows: any[];
    rowClick?: Function;
	sort?: Sort;
	changeSortCallback?: Function;
	sortableColumns?: (string|null)[];
	headerStyle?: object;
	rowStyle?: object;
}

const utilsService = new UtilsService()

export const TableGrid: React.FC<ContainerProps> = ({ rows, rowClick, sort, changeSortCallback, sortableColumns, headerStyle, rowStyle }) => {
	const keys = Object.keys(rows[0] || [])
	const { gridWidth, columnWidths } = utilsService.getGridWidths(rows)
	return (
		<div style={{ height: '100%', overflow: 'scroll' }}>
			<table style={{ width: gridWidth + 'px' }} key={utilsService.randomKey()}>
				<tbody>
					<tr key={utilsService.randomKey()}>
						{keys.map((keyname, index) => (
							<td
								style={{ verticalAlign: 'bottom', width: columnWidths[index] + 'px', ...headerStyle }}
								className='breakItUp TableGrid-header'
								key={utilsService.randomKey()}>
								{keyname}
								{sort && changeSortCallback && sortableColumns && typeof sortableColumns[index] === 'string' &&  						
									<TableColumnSort sort={sort} columnName={sortableColumns[index]} callback={changeSortCallback}/>
								}
							</td>
						))}
					</tr>
					{rows.map((row, index) => (
						<tr key={utilsService.randomKey()} onClick={() => {rowClick ? rowClick(row, index) : {} }}>
							{keys.map((key, index) => {
								// if (!Array.isArray(row[key])) {
								if (typeof row[key] !== 'object') {
									return (
										<td
											style={{ width: columnWidths[index] + 'px', ...rowStyle }}
											className='breakItUp TableGrid-row'
											key={utilsService.randomKey()}>
											{row[key]}
										</td>
									)
								} else if (row[key].TYPE) {
									switch (row[key].TYPE) {
										case 'IMAGE':
											return (
												<td
													style={{ width: columnWidths[index] + 'px', ...rowStyle }}
													className='breakItUp TableGrid-row'
													key={utilsService.randomKey()}>
													<img src={row[key].URL} alt={row[key].ALT || ''} />
												</td>
											)
										case 'LINK':
											return (
												<td
													style={{ width: columnWidths[index] + 'px', ...rowStyle }}
													className='breakItUp TableGrid-row'
													key={utilsService.randomKey()}>
													<a href={row[key].URL} target='_blank'>{row[key].TEXT}</a>
												</td>
											)
										case 'LINK_BUTTON':
											return (
												<td
													style={{ width: columnWidths[index] + 'px', ...rowStyle }}
													className='breakItUp TableGrid-row'
													key={utilsService.randomKey()}>
													<a href={row[key].URL} target='_blank' className='TableGrid-linkButton'>{row[key].TEXT}</a>
												</td>
											)
										default:
											return (
												<td
													style={{ width: columnWidths[index] + 'px' }}
													className='breakItUp TableGrid-row'
													key={utilsService.randomKey()}>
													{JSON.stringify(row[key])}
												</td>
											)													
									}

								} else {
									return (
										<td
											style={{ width: columnWidths[index] + 'px' }}
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
	)
}

// export default TableGrid;
