// generate-hierarchy.js
const fs = require('fs');
const path = require('path');

const MOC_FILE_PATH = 'content/notes/0___map_of_content.md'; // Path to your MOC file, at the root of your project
const OUTPUT_PATH = '_data/hierarchy.json'; // Where Eleventy will read from
const NOTES_BASE_URL = '/notes/'; // IMPORTANT: This must match the folder name from point #2

// A more robust slugify function.
const slugify = (str) => {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

const parseMoc = (mocContent) => {
  const lines = mocContent.split('\n').filter(line => line.trim() !== '');
  const hierarchy = [];
  // The stack manages nesting. The root has an indent level of -1.
  const stack = [{ indent: -1, children: hierarchy }];

  const linkRegex = /\[\[([^\]]+)\]\]/;

  for (const line of lines) {
    // 1. Determine the hierarchy level by counting leading spaces
    const indent = line.match(/^\s*/)[0].length;

    // 2. Clean the line to get the raw text
    // This strips leading whitespace and the numbered list marker (e.g., "1.", "2.1.")
    const rawText = line.trim().replace(/^[0-9\.]+\s/, '');
    const match = rawText.match(linkRegex);

    // If a line isn't a link (e.g., a category header), it's a critical error in your MOC.
    // Every line MUST point to a note.
    if (!match) {
      console.warn(`[SKIPPING] Line is not a valid link: "${line.trim()}"`);
      continue;
    }

    const title = match[1];
    const node = {
      title: title,
      url: `${NOTES_BASE_URL}${slugify(title)}/`,
      children: [] // Assume it can have children
    };

    // 3. Find the correct parent in the stack by popping off deeper levels
    while (indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    // 4. Add the new node to its parent's children array
    stack[stack.length - 1].children.push(node);

    // 5. Push the new node onto the stack, making it the potential parent for the next line
    stack.push({ indent: indent, children: node.children });
  }

  // A cleanup function to remove empty `children` arrays for cleaner JSON
  const pruneEmptyChildren = (nodes) => {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        pruneEmptyChildren(node.children);
      } else {
        delete node.children;
      }
    }
  };

  pruneEmptyChildren(hierarchy);
  return hierarchy;
};

// --- Main execution ---
try {
  if (!fs.existsSync(MOC_FILE_PATH)) {
    throw new Error(`MOC file not found at: ${MOC_FILE_PATH}`);
  }
  
  console.log(`Reading MOC from ${MOC_FILE_PATH}...`);
  const mocContent = fs.readFileSync(MOC_FILE_PATH, 'utf8');
  
  const hierarchyData = parseMoc(mocContent);

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(hierarchyData, null, 2));
  console.log(`Successfully generated ${OUTPUT_PATH}`);

} catch (error) {
  console.error('FATAL: Error generating hierarchy data:', error.message);
  process.exit(1);
}