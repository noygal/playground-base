var React = require('react');

// var injectTapEventPlugin = require('react-tap-event-plugin');
//
// //Needed for onTouchTap
// //Can go away when react 1.0 release
// //Check this repo:
// //https://github.com/zilverline/react-tap-event-plugin
// injectTapEventPlugin();

var Layout = require('./components/Layout.js');

React.render(React.createElement(Layout.Layout, null), document.body);
