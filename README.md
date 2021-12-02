# ionic-react-tablegrid

This is a React component for displaying interactive grids. 
## Features
- automatically set the width of each column based on the content it contains (including the content from all detail rows)
- function to execute on row click
- adjustable header and row styles
- sortable columns with icons for "sort ascending", "sort descending"

## Installation
`npm install --save ionic-react-tablegrid`
## Example
```jsx
import { TableGrid } from 'ionic-react-tablegrid'
const rows = [
		{name: 'John', age: 20, eyes: 'brown',},
		{name: 'Jane', age: 21, eyes: 'blue'},
		{name: 'Joe', age: 22, eyes: 'green'},
		{name: 'Jack', age: 23, eyes: 'brown'},
		{name: 'Jill', age: 24, eyes: 'blue'},
		{name: 'Juan', age: 25, eyes: 'green'},
		{name: 'Jenny', age: 26, eyes: 'brown'}
	  ]
const clickHandler = (row: any, index: number) => {
    console.log(`you clicked item #${index}`, row)
}
const changeSort = (sort: any) => {
    // sort: Sort returns { orderBy: string, ascending: boolean }
    console.log(`new sort should be on ${sort.orderBy} ${sort.ascending ? 'ASC' : 'DESC'}`)
}
return (
    <TableGrid rows={rows} 
        rowClick={clickHandler} 
        sort={sort} 
        changeSortCallback={changeSort} 
        sortableColumns={['name','age','eyes']}
        headerStyle={{backgroundColor: 'gray'}}
        rowStyle={{backgroundColor: 'white'}}
    />
)
```
