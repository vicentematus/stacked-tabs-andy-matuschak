import type { Metadata } from '$lib/markdown/renderer';

export interface ExternalLink {
	metadata: Metadata;
	prewiew: string;
}

// ojo tipo aca
export const getExternalLink = ({ data, body }: { data: Metadata; body: string }): ExternalLink => {
	return {
		metadata: data,
        prewiew: body 
	};
};
