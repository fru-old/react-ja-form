
/// <reference path="types/global.d.ts" />

import Greeter = require('./other');

var greeter = new Greeter("Hello, world!");
    
console.log(greeter.greet());

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

function logChange(val) {
    console.log("Selected: " + val);
}

ReactDOM.render(
    <div><Select
        name="form-field-name"
        value="one"
        options={options}
        onChange={logChange}
    /><MaskedInput
        mask="1111-11-11"
        placeholder="1234-WW-12"
        size="11"
    /></div>,
    document.getElementById('example')
);