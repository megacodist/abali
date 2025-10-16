// eleventy.config.js

import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginFilters from "./_config/filters.js";

// --- START: NAMED CALLBACK FUNCTIONS ---

/**
 * Preprocessor to handle draft posts.
 * @param {any} data The page's data object.
 */
const draftsPreprocessor = (data) => {
	if (data.draft) {
		data.title = `${data.title} (draft)`;
	}
	if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
		return false;
	}
};

/**
 * Creates the 'notes' collection.
 * @param {any} collectionApi The Eleventy Collection API.
 */
const notesCollection = (collectionApi) => {
	return collectionApi.getFilteredByGlob("./content/notes/**/*.md");
};

// --- END: NAMED CALLBACK FUNCTIONS ---


/**
 * The main configuration function.
 * @param {any} eleventyConfig The Eleventy configuration object.
 */
export default async function(eleventyConfig) {
	// Preprocessor
	eleventyConfig.addPreprocessor("drafts", "*", draftsPreprocessor);

	// Collections
	eleventyConfig.addCollection("notes", notesCollection);

	// Passthrough Copy
	eleventyConfig.addPassthroughCopy({ "./public/": "/" });
	eleventyConfig.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

	// Watch Targets
	eleventyConfig.addWatchTarget("css/**/*.css");
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

	// Bundles
	eleventyConfig.addBundle("css", { toFileDirectory: "dist", bundleHtmlContentFromSelector: "style" });
	eleventyConfig.addBundle("js", { toFileDirectory: "dist", bundleHtmlContentFromSelector: "script" });

	// Plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, { preAttributes: { tabindex: 0 } });
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(IdAttributePlugin);
	eleventyConfig.addPlugin(feedPlugin, { type: "atom", outputPath: "/feed/feed.xml" });
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, { formats: ["avif", "webp", "auto"] });
	eleventyConfig.addPlugin(pluginFilters);

	// Shortcodes
	eleventyConfig.addShortcode("currentBuildDate", () => (new Date()).toISOString());
};

// ANNOTATION: We remove all type annotations from the exported config object.
// The type checker will infer its shape, which is sufficient.
export const config = {
	templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
	dir: {
		input: "content",
		includes: "../_includes",
		data: "../_data",
		output: "_site",
	},
};