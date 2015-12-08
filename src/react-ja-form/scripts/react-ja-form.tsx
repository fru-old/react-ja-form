import Greeter = require('./other');

var greeter = new Greeter("Hello, world!");
    
console.log(greeter.greet());

declare var ReactDOM:any;
declare var React:any;

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);

