# ionic-react-tablegrid

This is a React component for displaying interactive grids. 

quick example:
```jsx    
<TableGrid rows={rows} /* [{name:'Bob',age:22,eyes:'blue'},{name:'Al',age:33,eyes:'brown'}] */
    rowClick={clickHandler} /* (row, index) => { console.log(row, index) } */
    sort={{"orderBy": "name", "ascending": true}} /* currently data is sorted on name, ascending */
    headers={['Name','Age','Eye Color']} /* optional column headers */
    headerStyle={{backgroundColor: 'gray'}} /* optional styles for header row */
    rowStyle={{backgroundColor: 'white'}} /* optional styles for detail rows */
    maxColumnWidth={400} /* optional */
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

### setRows (optional, required if using sorting)
takes a React `useState` setter

This is used to dynamically change the data in the TableGrid.  For example:
```tsx
const [people, setPeople] = useState([{name:"Larry"},{name:"Moe"},{name:"Curley"}]);

<TableGrid rows={people} setRows={setPeople} />
```
Say later, I want to add "Shemp" to the table:
```tsx
setPeople([{name:"Larry"},{name:"Moe"},{name:"Curley"},{name:"Shemp"}]);
```
As stated above, if using any sort columns, this is required because `TableGrid` will call the `setRows` function to update the table when the user clicks on the sort icon.

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
takes an object of type Sort with the initial sort data
```js
export interface Sort {
    orderBy: string;
    ascending: boolean;
}
```

example (current data is sort on name, ascending):
```json
{ "orderBy": "name", "ascending": true }
```

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
### maxColumnWidth (optional)
maximum size in pixels for a column

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

#### Sortable Columns
If you want a column to be sortable (with a toggle in the header to sort ascending or descending), just add a `^` (caret) the end of the column name, like this:
```js
const rows = [
    name^: 'Mr Stringman', // string
    age^: 55, // integer
    score^: 10535.553, // float
    registered: true // boolean
]
```
In the example above, columns `name^`, `age^`, and `score^` will be sortable.  The `^` symbols will be stripped from header names automatically.

### HIDDEN Objects
if an attribute name begins with `$` it will not be rendered, but it can contain hidden data that can be read in your `rowClick` function
```js
const rows = [{
    $id: 12345
    $hidden_notes: 'this note is hidden from the UI',
    name: 'Mr Stringman', // string
    age: 55, // integer
    score: 10535.553, // float
    registered: true // boolean
}]
```

### IMAGE object
you can create an image object using `TYPE: "IMAGE"`
```js
const rows = [{
    name: 'Bob',
    avatar: { 
        "TYPE": "IMAGE", 
        "url": "https://image.url", // required
        "cellStyle":{"textAlign": "center"}, // optional
        "rowStyle": {"height": "50px"} // optional
}]
```
You can pass optional objects for `cellStyle` and `rowStyle` for optional styling needs.

### CHECKBOX object
you can create a checkbox object using `TYPE: "CHECKBOX"`
```js
const rows = [{
    name: 'Bob',
    member: {
        "TYPE": "CHECKBOX", 
        "value": false, // "checked" also works here if you prefer
        "id": "Bob", // this value is passed to the checkBoxesCallback function
        "cellStyle":{"textAlign": "center"}, // optional
        "rowStyle": {"height": "50px"} // optional
        }
}]
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
### CUSTOM object
Custom objects can have custom formatted HTML and an optional sort object used to sort the table on this column.

Example:
```js
[ { Product: "Motorcycle",
    Price: { "TYPE": "CUSTOM",
             "html": "USD$14,999.99" + "<br/>" + "What a great price!",
             "sort": 14999.99 }},
  { Product: "Car",
    Price: { "TYPE": "CUSTOM",
             "html": "USD$24,550.99" + "<br/>" + "Ride in comfort!",
             "sort": 24550.99 }},
]
```

## Example
```jsx
import { TableGrid } from 'ionic-react-tablegrid'
const [rows, setRows] = useState([
    {name: 'John', age: 20, eyes: 'brown', $id: 1},
    {name: 'Jane', age: 21, eyes: 'blue', $id: 2},
    {name: 'Joe', age: 22, eyes: 'green', $id: 3},
    {name: 'Jack', age: 23, eyes: 'brown', $id: 4},
    {name: 'Jill', age: 24, eyes: 'blue', $id: 5},
    {name: 'Juan', age: 25, eyes: 'green', $id: 6},
    {name: 'Jenny', age: 26, eyes: 'brown', $id: 7}
])

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
const rowsWithSorting = [ 
    { Product: "Motorcycle",
        Price: { "TYPE": "CUSTOM",
                "html": "USD$14,999.99" + "<br/>" + "What a great price!",
                "sort": 14999.99 }},
    { Product: "Car",
        Price: { "TYPE": "CUSTOM",
                "html": "USD$24,550.99" + "<br/>" + "Ride in comfort!",
                "sort": 24550.99 }},
]
const clickHandler = (row: any, index: number) => {
    console.log(`you clicked item #${index}`, row);
    console.log(`the id of this row is ${$id}`);
}
const checkBoxesCallback = (checkboxes: string[]) => {
  console.log('checked boxes', checkboxes);
  // ['key1','key2','keyN']
}
return (
    <TableGrid rows={rows} setRows={setRows}
        headers={['Name','Age','Eye Color']}
        rowClick={clickHandler} 
        sort={{"name", true}} 
        checkBoxesCallback={checkBoxesCallback}
        headerStyle={{backgroundColor: 'gray'}}
        rowStyle={{backgroundColor: 'white'}}
    />
)
```
