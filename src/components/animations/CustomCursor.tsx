'use client';

import { useEffect, useState } from 'react';

const getCursorColorForBackground = (backgroundColor: string | null): string => {
	if (!backgroundColor || backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
		return '#ffffff';
	}

	const rgbValues = backgroundColor.match(/\d+(?:\.\d+)?/g);
	if (!rgbValues || rgbValues.length < 3) {
		return '#ffffff';
	}

	const [r, g, b] = rgbValues.slice(0, 3).map(Number);
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	return luminance > 0.6 ? '#111111' : '#ffffff';
};

export default function CustomCursor() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isInteractive, setIsInteractive] = useState(false);
	const [cursorColor, setCursorColor] = useState('#ffffff');

	useEffect(() => {
		const updateMousePosition = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });

			let currentElement: HTMLElement | null = document.elementFromPoint(
				event.clientX,
				event.clientY,
			) as HTMLElement | null;
			let backgroundColor: string | null = null;

			while (currentElement) {
				const computedBackground = window.getComputedStyle(currentElement).backgroundColor;
				if (
					computedBackground &&
					computedBackground !== 'rgba(0, 0, 0, 0)' &&
					computedBackground !== 'transparent'
				) {
					backgroundColor = computedBackground;
					break;
				}
				currentElement = currentElement.parentElement;
			}

			setCursorColor(getCursorColorForBackground(backgroundColor));
		};

		const updateHoverState = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			const interactiveElement = target?.closest(
				'a, button, input, textarea, select, [role="button"], [data-cursor-hover]',
			);
			setIsInteractive(Boolean(interactiveElement));
		};

		const resetHoverState = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			const relatedTarget = event.relatedTarget as HTMLElement | null;

			if (!target || !relatedTarget) {
				setIsInteractive(false);
				return;
			}

			if (!target.contains(relatedTarget)) {
				setIsInteractive(false);
			}
		};

		window.addEventListener('mousemove', updateMousePosition);
		document.addEventListener('mouseover', updateHoverState);
		document.addEventListener('mouseout', resetHoverState);

		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
			document.removeEventListener('mouseover', updateHoverState);
			document.removeEventListener('mouseout', resetHoverState);
		};
	}, []);

	return (
		<div
			aria-hidden="true"
			className={`custom-cursor ${isInteractive ? 'is-interactive' : ''}`}
			style={{
				left: `${mousePosition.x}px`,
				top: `${mousePosition.y}px`,
				borderColor: cursorColor,
				backgroundColor: isInteractive ? cursorColor : 'transparent',
			}}
		/>
	);
}