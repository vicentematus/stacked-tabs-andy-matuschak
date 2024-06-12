import { remark } from 'remark';
import matter from 'gray-matter';
import { visit } from 'unist-util-visit';
import type { Node } from 'unist';

export interface Metadata {
	[key: string]: any;
}

export interface MarkdownInfo {
	data: {
		title: string;
		date: Date;
		tags: string[];
	};
	body: string;
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

export function extractHrefs(markdown: string) {
	const links: any = [];
	remark()
		.use(() => (tree) => {
			visit(tree, 'link', (node: Node, index, parent) => {
				console.log({ node });
				if (node.type === 'link') {
                    // if the url string is not a relative path then return
                    //  todo: try to save the files who has external links
                    if (node.url.includes('http')) return console.error('External link found');

					links.push(node.url);
                    console.log({links})
                    
				}
			});
		})
		.process(markdown, () => {});
	return links;
}
