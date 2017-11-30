/**
 * Takes a CSSStyleSheet and turns it into a KVP-map
 * where each selector is a key.
 */
const cssToMap = ({ cssRules }) => {
  const cssMap = new Map();
  cssRules.forEach(({cssText}) => {
    const rules = cssText.replace(/\n/g, '').split('}');
    rules.forEach(rule => {
      const start = rule.indexOf('{');
      const key = rule.substr(0, start);
      const value = rule.substr(start + 1).trim();
      if (key && value) {
        cssMap.set(key, value);
      }
    });
  });
  return cssMap;
};
module.exports = cssToMap;
