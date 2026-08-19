export type MediaItem = {
	type: 'image' | 'video';
	src: string;
};

export type Project = {
	id: string;
	category: string;
	year: string;
	name: string;
	description: string;
	tech: string[];
	media: MediaItem[];
};