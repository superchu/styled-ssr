const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const { globalStyleSheet, componentStyleSheet } = require('styled-components/lib/models/StyleSheet.js');

// JSDOM
require('./lib/window.js');

// Helpers
const cssToMap = require('./lib/cssToMap.js');
const inlineStyles = require('./lib/inlineStyles.js');
const treeWalker = require('./lib/treeWalker.js');

const juice = require('juice');

const renderWithQuerySelector = element => {
  const htmlString = ReactDOMServer.renderToStaticMarkup(element);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlString;

  const cssMap = cssToMap(globalStyleSheet.sheet, componentStyleSheet.sheet);

  cssMap.forEach( (value, key) => {
    wrapper.querySelectorAll(key).forEach(node => {
      node.setAttribute('style', `${node.getAttribute('style') || ''}${value}`);
    });
  });

  return wrapper.innerHTML;
};

const renderWithTreeWalker = element => {
  const htmlString = ReactDOMServer.renderToStaticMarkup(element);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlString;

  const cssMap = cssToMap(globalStyleSheet.sheet, componentStyleSheet.sheet);

  treeWalker(wrapper, node => inlineStyles(node, cssMap));

  return wrapper.innerHTML;
};

const renderWithJuice = element => {
  const htmlString = ReactDOMServer.renderToStaticMarkup(element);
  const cssMap = cssToMap(globalStyleSheet.sheet, componentStyleSheet.sheet);

  const styles = [];
  cssMap.forEach( (value, key) => {
    styles.push(`${key} { ${value} }`);
  });
 
  return juice.inlineContent(htmlString, styles.join(''));
};

module.exports = renderWithJuice;
