/**
 * Turn CSSRules into inline-styles if the selector match
 * a given node.
 */
const inlineStyles = (node, lookup) => {
  const styles = [];
  lookup.forEach((value, key) => {
    if (node.matches(key)) {
      styles.push(value);
    }
  });

  if (styles.length) {
    node.setAttribute('style', styles.join());
  }
};
module.exports = inlineStyles;
