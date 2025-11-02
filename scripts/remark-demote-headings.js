// ./scripts/remark-demote-headings.js
// @ts-check
'use strict';
let visitModule;
try {
  visitModule = require('unist-util-visit');
} catch (e) {
  throw new Error('Install dev dep: yarn add -D unist-util-visit');
}
const visit = (visitModule && (visitModule.default || visitModule.visit || visitModule));
if (typeof visit !== 'function') {
  throw new TypeError('unist-util-visit import error: "visit" is not a function');
}

module.exports = function remarkDemoteHeadings() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      if (typeof node.depth === 'number') {
        node.depth = Math.min(node.depth + 1, 6);
      }
    });
  };
};
