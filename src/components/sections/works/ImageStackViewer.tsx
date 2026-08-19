'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	Cancel01Icon,
	Maximize01Icon as ExpandIcon,
} from 'hugeicons-react';
import type { Project } from './types';

const SPRING = { type: 'spring', stiffness: 320, damping: 34, mass: 0.9 } as const;

/** Shortest signed distance from `index` to `i` on a circular track of length `total`. */
function getOffset(i: number, index: number, total: number) {
	let diff = i - index;
	if (diff > total / 2) diff -= total;
	if (diff < -total / 2) diff += total;
	return diff;
}

export default function ImageStackViewer({
	project,
	onClose,
}: {
	project: Project;
	onClose: () => void;
}) {
	const [index, setIndex] = useState(0);
	const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
	const total = project.media.length;
	const wheelLockRef = useRef(false);

	const goNext = () => {
		setIndex((i) => (i + 1) % total);
		setIsVideoFullscreen(false);
	};

	const goPrev = () => {
		setIndex((i) => (i - 1 + total) % total);
		setIsVideoFullscreen(false);
	};

	const goTo = (i: number) => {
		setIndex(((i % total) + total) % total);
		setIsVideoFullscreen(false);
	};

	const handleWheel = (e: React.WheelEvent) => {
		if (wheelLockRef.current) return;
		const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
		if (Math.abs(delta) < 24) return;
		wheelLockRef.current = true;
		if (delta > 0) goNext();
		else goPrev();
		window.setTimeout(() => {
			wheelLockRef.current = false;
		}, 350);
	};

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (isVideoFullscreen) setIsVideoFullscreen(false);
				else onClose();
			}
			if (e.key === 'ArrowRight' && !isVideoFullscreen) goNext();
			if (e.key === 'ArrowLeft' && !isVideoFullscreen) goPrev();
		};
		window.addEventListener('keydown', onKey);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKey);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [total, isVideoFullscreen]);

	const activeItem = project.media[index];
	const isVideo = activeItem.type === 'video';

	const fullscreenVideo =
		isVideo && isVideoFullscreen
			? createPortal(
					<div
						className="fixed inset-0 z-[300] flex items-center justify-center bg-black"
						onClick={(e) => {
							e.stopPropagation();
							setIsVideoFullscreen(false);
						}}
					>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								setIsVideoFullscreen(false);
							}}
							aria-label="Exit fullscreen"
							className="label-text absolute right-6 top-6 z-10 flex items-center gap-2 text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)] md:right-10 md:top-10"
						>
							<Cancel01Icon size={16} />
							Close
						</button>
						<video
							src={activeItem.src}
							className="h-full w-full object-contain"
							autoPlay
							loop
							controls
							playsInline
							preload="metadata"
							onClick={(e) => e.stopPropagation()}
						/>
					</div>,
					document.body
			  )
			: null;

	return (
		<motion.div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--ink)]/92 px-6 backdrop-blur-sm"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
			onClick={onClose}
		>
			{fullscreenVideo}
			<button
				onClick={onClose}
				aria-label="Close gallery"
				className="label-text absolute right-6 top-6 z-20 flex items-center gap-2 text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)] md:right-10 md:top-10"
			>
				<Cancel01Icon size={16} />
				Close
			</button>

			<motion.div
				className="relative flex w-full max-w-[980px] flex-col items-center"
				initial={{ y: 40, opacity: 0, scale: 0.94 }}
				animate={{ y: 0, opacity: 1, scale: 1 }}
				exit={{ y: 20, opacity: 0, scale: 0.96 }}
				transition={SPRING}
				onClick={(e) => e.stopPropagation()}
			>
				<p className="label-text mb-6 text-[var(--paper)]/60">
					{project.name} · {String(index + 1).padStart(2, '0')} /{' '}
					{String(total).padStart(2, '0')}
				</p>

				<div className="relative w-full">
					{total > 1 && (
						<>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									goPrev();
								}}
								aria-label="Previous item"
								className="absolute left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--paper)]/15 bg-[var(--ink)]/60 text-[var(--paper)]/80 backdrop-blur-md transition hover:border-[var(--paper)]/35 hover:text-[var(--paper)] md:left-3 md:h-12 md:w-12"
							>
								<ArrowLeft01Icon size={20} />
							</button>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									goNext();
								}}
								aria-label="Next item"
								className="absolute right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--paper)]/15 bg-[var(--ink)]/60 text-[var(--paper)]/80 backdrop-blur-md transition hover:border-[var(--paper)]/35 hover:text-[var(--paper)] md:right-3 md:h-12 md:w-12"
							>
								<ArrowRight01Icon size={20} />
							</button>
						</>
					)}

					<div className="relative aspect-[16/10] w-full overflow-hidden" onWheel={handleWheel}>
						{project.media.map((item, i) => {
							const offset = getOffset(i, index, total);
							const isCenter = offset === 0;
							const visible = Math.abs(offset) <= 1;

							return (
								<motion.div
									key={item.src}
									className={`absolute top-0 h-full w-[62%] select-none ${
										isCenter ? 'cursor-grab active:cursor-grabbing' : visible ? 'cursor-pointer' : 'pointer-events-none'
									}`}
									style={{ left: '50%', zIndex: isCenter ? 3 : visible ? 2 : 1 }}
									animate={{
										x: `calc(-50% + ${offset * 74}%)`,
										scale: isCenter ? 1 : visible ? 0.82 : 0.7,
										opacity: isCenter ? 1 : visible ? 0.45 : 0,
									}}
									transition={SPRING}
									drag={isCenter && !isVideo ? 'x' : false}
									dragElastic={0.6}
									dragConstraints={{ left: 0, right: 0 }}
									onDragEnd={(_, info) => {
										if (info.offset.x < -80 || info.velocity.x < -400) goNext();
										else if (info.offset.x > 80 || info.velocity.x > 400) goPrev();
									}}
									onClick={() => {
										if (offset < 0) goPrev();
										else if (offset > 0) goNext();
									}}
								>
									{item.type === 'video' ? (
										isCenter ? (
											<div className="relative h-full w-full">
												<video
													src={item.src}
													className="h-full w-full object-contain"
													autoPlay
													loop
													muted
													playsInline
													controls
													preload="metadata"
												/>
												<button
													type="button"
													onClick={(e) => {
														e.stopPropagation();
														setIsVideoFullscreen(true);
													}}
													aria-label="Expand video to fullscreen"
													className="label-text absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[var(--paper)] transition-colors hover:bg-black/80"
												>
													<ExpandIcon size={14} />
													Expand
												</button>
											</div>
										) : (
											<video
												src={item.src}
												className="h-full w-full object-contain"
												muted
												playsInline
												preload="metadata"
											/>
										)
									) : (
										<img
											src={item.src}
											alt={`${project.name} preview ${i + 1}`}
											className="h-full w-full object-contain"
											loading={isCenter ? 'eager' : 'lazy'}
											draggable={false}
										/>
									)}
								</motion.div>
							);
						})}
					</div>
				</div>

				<div className="mt-8 flex items-center gap-6">
					<button
						onClick={goPrev}
						className="label-text flex items-center gap-1.5 text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)]"
					>
						<ArrowLeft01Icon size={14} />
						Prev
					</button>

					<div className="flex gap-1.5">
						{project.media.map((_, i) => (
							<button
								key={i}
								aria-label={`Go to item ${i + 1}`}
								onClick={() => goTo(i)}
								className={`h-1 w-6 transition-colors ${
									i === index ? 'bg-[var(--paper)]' : 'bg-[var(--paper)]/25 hover:bg-[var(--paper)]/50'
								}`}
							/>
						))}
					</div>

					<button
						onClick={goNext}
						className="label-text flex items-center gap-1.5 text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)]"
					>
						Next
						<ArrowRight01Icon size={14} />
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}