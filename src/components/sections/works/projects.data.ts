import type { Project } from './types';

export const projects: Project[] = [
	{
		id: '01',
		category: 'Web Application',
		year: '2026',
		name: 'Feralde',
		description:
			'A modern e-commerce platform built to bring Feralde`s products and online shopping experience to the next level. Built with React, TypeScript, and Node.js for a seamless user experience.',
		tech: ['React Vite', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Prisma ORM'],
		media: [
			{ type: 'image', src: '/Feralde/feralde5.jpeg' },
			{ type: 'image', src: '/Feralde/feralde4.jpeg' },
			{ type: 'image', src: '/Feralde/feralde3.jpeg' },
			{ type: 'image', src: '/Feralde/feralde2.jpeg' },
			{ type: 'image', src: '/Feralde/feralde1.png' },
			{ type: 'image', src: '/Feralde/feralde6.jpeg' },
			{ type: 'image', src: '/Feralde/feralde7.jpeg' },
		],
	},
	{
		id: '02',
		category: 'Iot & Mobile Application',
		year: '2025 - 2026',
		name: 'PondMate',
		description:
			'An Iot-enabled fish farming solution that connects mobile software with automated hardware to simplify feeding, monitoring, and pond management.',
		tech: ['Figma', 'Java', 'REST API', 'Arduino C/C++', 'ESP8266 Nodemcu'],
		media: [
			{ type: 'image', src: '/Pondmate/pondmate1.jpg' },
			{ type: 'image', src: '/Pondmate/pondmate2.jpg' },
			{ type: 'image', src: '/Pondmate/pondmate3.jpg' },
			{ type: 'video', src: '/Pondmate/pondmate.mp4' },
		],
	},
	{
		id: '03',
		category: 'Virtual Assistant Platform',
		year: '2026',
		name: 'PowerAssist',
		description:
			'A web-based platform designed to streamline virtual assistant services through centralized tools.',
		tech: ['Next.js', 'Figma', 'Tailwind CSS'],
		media: [
			{ type: 'image', src: '/PowerAssist/pa1.png' },
			{ type: 'image', src: '/PowerAssist/pa2.png' },
			{ type: 'image', src: '/PowerAssist/pa3.png' },
			{ type: 'image', src: '/PowerAssist/pa4.png' },
			{ type: 'image', src: '/PowerAssist/pa5.png' },
		],
	},
];