// eleventy.config.js

import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginFilters from "./_config/filters.js";

// --- START: NAMED CALLBACK FUNCTIONS ---
// By defining callbacks as named constants, we can apply JSDoc directly and cleanly.

/**
 * Preprocessor to handle draft posts.
 * @param {Record<string, any>} data The page's data object.
 */
const draftsPreprocessor = (data) => {
	if (data.draft) {
		data.title = `${data.title} (draft)`;
	}
	if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
		return false; // Skip this file during production build
	}
};

/**
 * Creates the 'notes' collection.
 * @param {import("11ty.ts").CollectionApi} collectionApi The Eleventy Collection API.
 */
const notesCollection = (collectionApi) => {
	return collectionApi.getFilteredByGlob("./content/notes/**/*.md");
};

// --- END: NAMED CALLBACK FUNCTIONS ---


/**
 * The main configuration function.
 * @param {import("11ty.ts").UserConfig} eleventyConfig The Eleventy configuration object.
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

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed/feed.xml",
		// ... other feed options
	});

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ["avif", "webp", "auto"],
		// ... other image options
	});

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	// Shortcodes
	eleventyConfig.addShortcode("currentBuildDate", () => (new Date()).toISOString());
};

/**
 * The secondary configuration object for directory paths, etc.
 * This is now a top-level export, which is syntactically correct.
 * @type {Partial<import("@11ty/eleventy").UserConfig>}
 */
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
	// pathPrefix: "/",
};