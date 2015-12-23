(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="types/global.d.ts" />
var Greeter = require('./other');
var greeter = new Greeter("Hello, world!");
console.log(greeter.greet());
var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];
function logChange(val) {
    console.log("Selected: " + val);
}
ReactDOM.render(React.createElement("div", null, React.createElement(Select, {"name": "form-field-name", "value": "one", "options": options, "onChange": logChange}), React.createElement(MaskedInput, {"mask": "1111-11-11", "placeholder": "1234-WW-12", "size": "11"})), document.getElementById('example'));



},{"./other":2}],2:[function(require,module,exports){
var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "<h1>" + this.greeting + "</h1>";
    };
    return Greeter;
})();
;
module.exports = Greeter;



},{}]},{},[1])