// content/notes/notes.11tydata.cjs

const { titleCase } = require("title-case");

/** @typedef {import('../../types.js').EleventyData} EleventyData */
/** @typedef {import('../../types.js').Backlink} Backlink */

// --- Functions ---

const wikilinkRegExp = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g;

/**
 * Compares two strings case-insensitively.
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function caselessCompare(a, b) {
    return a.normalize().toLowerCase() === b.normalize().toLowerCase();
}

// --- Eleventy Exports ---

module.exports = {
    layout: "note.njk",
    type: "note",
    eleventyComputed: {
        /**
         * Computes the title for a note.
         * @param {EleventyData} data - The page's data object.
         * @returns {string}
         */
        title: data => titleCase(data.title || data.page.fileSlug),

        /**
         * Generates a list of backlinks for the current note.
         * @param {EleventyData} data - The page's data object.
         * @returns {Backlink[]}
         */
        backlinks: (data) => {
            const notes = data.collections.notes;
            const currentFileSlug = data.page.filePathStem.replace('/notes/', '');

            if (!notes) {
                return [];
            }

            /** @type {Backlink[]} */
            const backlinks = [];

            // Search the other notes for backlinks
            for (const otherNote of notes) {
                const noteContent = otherNote.templateContent;
                if (!noteContent) {
                    continue; // Skip notes with no content
                }

                const outboundLinks = (noteContent.match(wikilinkRegExp) || [])
                    .map(link => (
                        link.slice(2, -2)
                            .split("|")[0]
                            .replace(/.(md|markdown)\s?$/i, "")
                            .trim()
                    ));

                if (outboundLinks.some(link => caselessCompare(link, currentFileSlug))) {
                    backlinks.push({
                        url: otherNote.url,
                        title: otherNote.data.title,
                        preview: noteContent.slice(0, 240)
                    });
                }
            }

            return backlinks;
        }
    }
}