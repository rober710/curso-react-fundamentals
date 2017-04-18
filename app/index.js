var React = require('react');
var ReactDom = require('react-dom');
var PropTypes = require('prop-types');
var App = require('./componentes/App');

require('./index.css');

ReactDom.render(<App/>, document.getElementById('app'));
