const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const { globalStyleSheet, componentStyleSheet } = require('styled-components/lib/models/StyleSheet.js');

// JSDOM
require('./lib/window.js');

// Helpers
const cssToMap = require('./lib/cssToMap.js');
const inlineStyles = require('./lib/inlineStyles.js');
const treeWalker = require('./lib/treeWalker.js');

const render = element => {
  console.time('react');
  const htmlString = ReactDOMServer.renderToStaticMarkup(element);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlString;
  console.timeEnd('react');

  // Inline-css
  console.time('map');
  const cssMap = cssToMap(globalStyleSheet.sheet, componentStyleSheet.sheet);
  console.timeEnd('map');
  
  console.time('query');
  cssMap.forEach( (value, key) => {
    wrapper.querySelectorAll(key).forEach(node => {
      node.setAttribute('style', `${node.getAttribute('style') || ''}${value}`);
    });
  });
  console.timeEnd('query');

  // console.time('treewalk');
  // treeWalker(wrapper, node => inlineStyles(node, cssMap));
  // console.timeEnd('treewalk');
  
  return wrapper.innerHTML;
};

module.exports = render;
