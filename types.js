// --- JSDoc Type Definitions ---

/**
 * Represents a single note object within an Eleventy collection.
 * This is a simplified interface focusing on what we use in this file.
 * @typedef {object} Note
 * @property {string} url - The final URL of the note.
 * @property {string} templateContent - The raw Markdown content of the note.
 * @property {object} data - The note's computed data, including front matter.
 * @property {string} data.title - The title of the note.
 */

/**
 * The data object passed by Eleventy to computed data functions.
 * @typedef {object} EleventyData
 * @property {object} collections - All Eleventy collections.
 * @property {Note[]} collections.notes - Our custom collection of notes.
 * @property {string} [title] - The title from front matter, if it exists.
 * @property {object} page
 * @property {string} page.fileSlug - The URL-friendly slug of the file.
 * @property {string} page.filePathStem - The full path of the file stem.
 */

/**
 * The structure of a single backlink object.
 * @typedef {object} Backlink
 * @property {string} url
 * @property {string} title
 * @property {string} preview
 */

// Export an empty object to preserve module structure
export {};
