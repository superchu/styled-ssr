/**
 * Takes a CSSStyleSheet and turns it into a KVP-map
 * where each selector is a key.
 */
const cssToMap = (...styles) => {
  const cssMap = new Map();
  styles.forEach(({ cssRules }) => extractStyles(cssRules, cssMap));
  return cssMap;
}

const extractStyles = (cssRules, cssMap) => {
  cssRules.forEach(({cssText}) => {
    const rules = cssText.replace(/\n/g, '').split('}');
    rules.forEach(rule => {
      rule = rule.replace(/(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g, ''); // Strip comments
      const start = rule.indexOf('{');
      const key = rule.substr(0, start).trim();
      const value = rule.substr(start + 1).trim();
      if (isValidKey(key) && value) {
        cssMap.set(key, value);
      }
    });
  });
};

const isValidKey = key => key && key[0] !== '@' && !/^\d/.test(key);

module.exports = cssToMap;
