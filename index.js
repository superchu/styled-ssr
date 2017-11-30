const ReactDOMServer = require('react-dom/server');
const { componentStyleSheet } = require('styled-components/lib/models/StyleSheet.js');

// JSDOM
require('./lib/window.js');

// Helpers
const cssToMap = require('./lib/cssToMap.js');
const inlineStyles = require('./lib/inlineStyles.js');
const treeWalker = require('./lib/treeWalker.js');

const render = element => {
  const htmlString = ReactDOMServer.renderToStaticMarkup(element);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlString;

  // Inline-css
  const cssMap = cssToMap(componentStyleSheet.sheet);
  treeWalker(wrapper, node => inlineStyles(node, cssMap));

  return wrapper.innerHTML;
};

module.exports = render;
