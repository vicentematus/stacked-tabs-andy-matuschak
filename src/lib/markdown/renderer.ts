import path from 'path';
import fs from 'fs';
import { remark } from 'remark';
import matter from 'gray-matter';
import { visit } from 'unist-util-visit';
import type { Node, Parent } from 'unist';
import consola from 'consola';
import { unified } from 'unified';
import stringifyMd from "remark-stringify";

import { generateSlug } from '$lib/utils/directory';
import type { ExternalLink } from '$lib/models/links';

export interface Metadata {
	[key: string]: string | boolean |Date | any;
}

export interface MarkdownInfo {
	data: {
		title: string;
		date: Date;
		tags: string[];
	};
	body: string;
	externalLinks: ExternalLink[];
}

export function extractFrontMatter(markdown: string) {
	// falta definir el tipo de metadata que es como matter.graymateteroption
	const metadata: Metadata = matter(markdown);
	return getStructuredMatter(metadata);
}

const getStructuredMatter = (frontMatter: Metadata) => {
	return {
		data: {
			title: frontMatter.title || '',
			date: frontMatter.date || '',
			tags: frontMatter.tags || []
		},
		body: frontMatter.content
	};
};

export function extractHrefs(markdown: string): string[] {
	const links: any = [];
	remark()
		.use(() => (tree) => {
			visit(tree, 'link', (node: Node, index, parent) => {
				// if the url string is not a relative path then return
				//  todo: try to save the files who has external links
				if (node.url.includes('http')) return consola.error('External link found', node.url);

				links.push(node.url);
				console.log({ links });
			});
		})
		.process(markdown, () => {});
	return links;
}



export function generatePreviewMarkdown(filename:string) {
	const { dir, name } = path.parse(filename);
	const noteName = path.join(dir, name);
	const slug = generateSlug(noteName);
	const fullPath = thoughtsDirectory + filename;
	const { birthtime, mtime } = fs.statSync(fullPath);
	const rawContent = fs.readFileSync(fullPath, "utf-8");
	const { content, data: frontmatter } = matter(rawContent);
	if (frontmatter.hidden && !showHidden) {
	  return null;
	}

	const thoughtProps = {
	  birthtime,
	  mtime,
	  filename,
	  fullPath,
	  slug,
	  name: noteName,
	  // eslint-disable-next-line @typescript-eslint/no-explicit-any
	  frontmatter: (frontmatter as any) as ThoughtFrontmatter,
	};

	const isPrivate = frontmatter.private == true || privates.some(matches(filename));
	if (isPrivate && !showPrivates) {
	  return {
		...thoughtProps,
		rawContent: privateMarkdown,
		content: privateMarkdown,
	  };
	}

	return {
	  ...thoughtProps,
	  rawContent,
	  content,
	};

}