# ionic-react-tablegrid

This is a React component for displaying interactive grids. 

quick example:
```jsx    
<TableGrid rows={rows} /* [{name:'Bob',age:22,eyes:'blue'},{name:'Al',age:33,eyes:'brown'}] */
    rowClick={clickHandler} /* (row, index) => { console.log(row, index) } */
    sort={{"name", true}} /* currently data is sorted on name, ascending */
    changeSortCallback={changeSort} /* (sort: any) => { console.log(sort) } */
    headers={['Name','Age','Eye Color']} /* optional column headers */
    sortableColumns={['name','age','eyes']} /* pass this string when the sort icon is clicked */
    headerStyle={{backgroundColor: 'gray'}} /* optional styles for header row */
    rowStyle={{backgroundColor: 'white'}} /* optional styles for detail rows */
/>
```
## Features
- automatically set the width of each column based on the content it contains (including the content from all detail rows)
- function to execute on row click
- adjustable header and row styles
- optional headers array (if headers need to be different from the field names)
- sortable columns with icons for "sort ascending", "sort descending"

## Installation
`npm install --save ionic-react-tablegrid`
## TableGrid Attributes
### rows (required)
takes an array of objects with key/value pairs

example:
```json
[{"key1": "value1", "key2": "value2"}]
```

The keys should be consistent among all rows, (like a database or spreadsheet).
### headers (optional)
takes an array of strings to be used as the column headers

example:
```json
["Name","Age","Eye Color"]
```
### rowClick (optional)
takes a function that receives two parameters: the row that was clicked (object), and the row's index (number)

example:
```js
const clickHandler = (row: any, index: number) => {
    console.log(`you clicked item #${index}`, row)
}
```
### sort (optional)
takes an object of type Sort with the current sort data
```js
export interface Sort {
    orderBy: string;
    ascending: boolean;
}
```

example (current data is sort on name, ascending):
```json
{ "name", true }
```

### changeSortCallback (optional)
takes a callback function that receives a new "sort" object, which you can use to re-sort your data

example:
```js
const changeSort = (sort: any) => {
    // sort: Sort returns { orderBy: string, ascending: boolean }
    console.log(`we should now sort our data on ${sort.orderBy} ${sort.ascending ? 'ASC' : 'DESC'}`)
}
```
### sortableColumns (optional)
takes an array of (string | null)
- if a column position contains a string, that is passed to the sort object when the sort button in the column header is clicked
- if a column position is `null` or `undefined`, then no sort button will be displayed for that column header
- clicking on the sort button for a column the first time changes to the sort item for that column in ascending order, clicking a second time toggles it to descending, and so on

example (allow sorting on the first and third columns only):
```js
["name", null, "eyes"]
```
in the example above, 
- sort icons will show up in the headers of columns 1 and 3
- clicking the sort icon for column 1 will set the sort to `{ "name", true }`
- clicking the sort icon for column 1 again will set the sort to `{ "name", false }`

### changeCheckboxesCallback (optional)
takes a callback function that receives an array of `ids` (strings) for the checkboxes that are currently checked

example:
```js
const checkBoxesCallback = (checkboxes: string[]) => {
  console.log('checked boxes', checkboxes);
  // ['key1','key2','keyN']
}
```

### headerStyle (optional)
additional object of styles for the header row

example:
```json
{"backgroundColor": "gray", "color": "darkblue"}
```

### rowStyle (optional)
additional object of styles for the detail rows

example:
```json
{"backgroundColor": "white", "color": "black"}
```

## Row Attributes

### Simple Object
you can pass a simple string, numeric, or boolean object like this:
```js
const rows = [
    name: 'Mr Stringman', // string
    age: 55, // integer
    score: 10535.553, // float
    registered: true // boolean
]
```
NOTE: the column width for each column will be set based on the maximum width of the value of the row with the longest entry (up to the max value).
### IMAGE object
you can create an image object using `TYPE: "IMAGE"`
```js
const rows = [
    name: 'Bob',
    avatar: { 
        "TYPE": "IMAGE", 
        "url": "https://image.url", // required
        "cellStyle":{"textAlign": "center"}, // optional
        "rowStyle": {"height": "50px"} // optional
]
```
You can pass optional objects for `cellStyle` and `rowStyle` for optional styling needs.

### CHECKBOX object
you can create a checkbox object using `TYPE: "CHECKBOX"`
```js
const rows = [
    name: 'Bob',
    member: {
        "TYPE": "CHECKBOX", 
        "value": false, // "checked" also works here if you prefer
        "id": "Bob", // this value is passed to the checkBoxesCallback function
        "cellStyle":{"textAlign": "center"}, // optional
        "rowStyle": {"height": "50px"} // optional
        }
]
```
You can pass optional objects for `cellStyle` and `rowStyle` for optional styling needs.

When using a `CHECKBOX` object you need to pass a callback function to your `TableGrid` called `checkBoxesCallback` which will contain an array of `id`'s that are currently checked.

`TableGrid`:
```jsx
<TableGrid rows={rows} 
    checkBoxesCallback={checkBoxesCallback}
/>
```
Callback Function:
```js
const checkBoxesCallback = (checkboxes: string[]) => {
  console.log('checked boxes', checkboxes);
  // returns: ['key1','key2','keyN']
}
```

## Example
```jsx
import { TableGrid } from 'ionic-react-tablegrid'
const rows = [
		{name: 'John', age: 20, eyes: 'brown'},
		{name: 'Jane', age: 21, eyes: 'blue'},
		{name: 'Joe', age: 22, eyes: 'green'},
		{name: 'Jack', age: 23, eyes: 'brown'},
		{name: 'Jill', age: 24, eyes: 'blue'},
		{name: 'Juan', age: 25, eyes: 'green'},
		{name: 'Jenny', age: 26, eyes: 'brown'}
	  ]
const rowsWithThumbNail = [
    		{name: 'John', age: 20, eyes: 'brown',
                thumbnail: { "TYPE": "IMAGE", "url": "https://image.url", 
                            "cellStyle":{"textAlign": "center"}, 
                            "rowStyle": {"height": "50px"}}

]
const rowsWithCheckbox = [
    {name: 'John', 
    age: 20, 
    eyes: 'brown',
    checkbox: {
        "TYPE": "CHECKBOX", 
        "value": false, 
        "id": "John"}
]
const clickHandler = (row: any, index: number) => {
    console.log(`you clicked item #${index}`, row)
}
const changeSort = (sort: any) => {
    // sort: Sort returns { orderBy: string, ascending: boolean }
    console.log(`new sort should be on ${sort.orderBy} ${sort.ascending ? 'ASC' : 'DESC'}`)
}
const checkBoxesCallback = (checkboxes: string[]) => {
  console.log('checked boxes', checkboxes);
  // ['key1','key2','keyN']
}
return (
    <TableGrid rows={rows} 
        headers={['Name','Age','Eye Color']}
        rowClick={clickHandler} 
        sort={{"name", true}} 
        changeSortCallback={changeSort} 
        checkBoxesCallback={checkBoxesCallback}
        sortableColumns={['name','age','eyes']}
        headerStyle={{backgroundColor: 'gray'}}
        rowStyle={{backgroundColor: 'white'}}
    />
)
```
