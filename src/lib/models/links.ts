import type { Metadata } from '$lib/markdown/renderer';

export interface ExternalLink {
	metadata: Metadata;
	preview: string;
	path: string;
}

// ojo tipo aca
export const getExternalLink = ({ data, body,path }: { data: Metadata; body: string ,path:string}): ExternalLink => {
	return {
		metadata: data,
        preview: body ,
		path: '/notes/'+path
	};
};
