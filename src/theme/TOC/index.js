// src/theme/TOC/index.js
import React from 'react';
import OriginalTOC from '@theme-original/TOC';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

function flattenItems(items, out = []) {
  if (!items) return out;
  for (const it of items) {
    out.push(it);
    if (Array.isArray(it.items) && it.items.length > 0) {
      flattenItems(it.items, out);
    }
  }
  return out;
}

export default function TOCWithH1(props) {
  const {toc} = props;
  const doc = useDoc?.() ?? null;

  // If no toc at all, just delegate to original (keeps original behavior)
  if (!toc) {
    return <OriginalTOC {...props} />;
  }

  // Determine if incoming toc is a flat array or nested object
  const tocIsArray = Array.isArray(toc);
  let nestedItems = [];
  if (tocIsArray) {
    // incoming is flat array; convert to nestedItems as a shallow copy
    nestedItems = toc.map(item => ({ ...item }));
  } else {
    nestedItems = Array.isArray(toc.items) ? [...toc.items] : [];
  }

  // Add synthetic H1 if doc has title and no level-1 exists
  const hasH1 = nestedItems.some(it => it.level === 1);
  if (doc?.metadata?.title && !hasH1) {
    const h1Item = {
      value: doc.metadata.title,
      // For safety include a permalink to the page top (change if you later add real anchors)
      permalink: doc.metadata.permalink ?? typeof window !== 'undefined' ? window.location.pathname : '/',
      level: 1,
    };
    // Prepend into nested items so it shows first
    nestedItems.unshift(h1Item);
  }

  // Build newToc in the same shape as input:
  const newToc = tocIsArray ? nestedItems : { ...toc, items: nestedItems };

  // Build a flattened array (flatTOC) — OriginalTOC in some versions expects this prop
  const newFlatTOC = flattenItems(nestedItems, []);

  // Return the original component but provide both shapes (safer across versions)
  return <OriginalTOC {...props} toc={newToc} flatTOC={newFlatTOC} />;
}
