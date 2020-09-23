"use strict";

console.log('App.js is running');
var app = {
  title: 'Indecision App',
  subtitle: 'This is some info',
  options: []
};

var onFormSubmit = function onFormSubmit(event) {
  event.preventDefault();
  var option = event.target.elements.option.value;

  if (option) {
    app.options.push(option);
    event.target.elements.option.value = '';
    renderApp();
  }
};

var removeAll = function removeAll() {
  app.options = [];
  renderApp();
};

var appRoot = document.getElementById('app');

var renderApp = function renderApp() {
  var template = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, app.title), app.subtitle && /*#__PURE__*/React.createElement("p", null, app.subtitle), /*#__PURE__*/React.createElement("button", {
    onClick: removeAll
  }, "Remove"), /*#__PURE__*/React.createElement("p", null, app.options.length > 0 ? 'Here are your options' : 'No options'), /*#__PURE__*/React.createElement("p", null, app.options.length), /*#__PURE__*/React.createElement("form", {
    onSubmit: onFormSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "option"
  }), /*#__PURE__*/React.createElement("button", null, "Add Option")));
  ReactDOM.render(template, appRoot);
};

renderApp();
