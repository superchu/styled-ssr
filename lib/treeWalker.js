/**
 * Simply just walks a tree..
 */
const treeWalker = (node, cb) => {
  if (!node) {
    return;
  }

  if (node.nodeType === 1) {
    cb(node);
  }

  treeWalker(node.firstChild, cb);
  treeWalker(node.nextSibling, cb);
}
module.exports = treeWalker;
