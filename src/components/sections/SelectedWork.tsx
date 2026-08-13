'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';

type MediaItem = {
	type: 'image' | 'video';
	src: string;
};

type Project = {
	id: string;
	category: string;
	year: string;
	name: string;
	description: string;
	tech: string[];
	media: MediaItem[];
};

const projects: Project[] = [
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

const SPRING = { type: 'spring', stiffness: 340, damping: 32, mass: 0.9 } as const;

const slideVariants = {
	enter: (dir: 1 | -1) => ({ opacity: 0, x: dir * 60, scale: 0.97 }),
	center: { opacity: 1, x: 0, scale: 1 },
	exit: (dir: 1 | -1) => ({ opacity: 0, x: dir * -60, scale: 0.97 }),
};

function ImageStackViewer({
	project,
	onClose,
}: {
	project: Project;
	onClose: () => void;
}) {
	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState<1 | -1>(1);
	const [cursorSide, setCursorSide] = useState<'left' | 'right' | null>(null);
	const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const total = project.media.length;

	// custom cursor follower
	const cursorX = useMotionValue(0);
	const cursorY = useMotionValue(0);
	const smoothX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.5 });
	const smoothY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.5 });

	// drag on the top card
	const dragX = useMotionValue(0);

	const goNext = () => {
		setDirection(1);
		setIndex((i) => (i + 1) % total);
		dragX.set(0);
		setIsVideoFullscreen(false);
	};

	const goPrev = () => {
		setDirection(-1);
		setIndex((i) => (i - 1 + total) % total);
		dragX.set(0);
		setIsVideoFullscreen(false);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		cursorX.set(e.clientX);
		cursorY.set(e.clientY);
		const relativeX = e.clientX - rect.left;
		setCursorSide(relativeX < rect.width / 2 ? 'left' : 'right');
	};

	const handleCardClick = (e: React.MouseEvent) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const relativeX = e.clientX - rect.left;
		if (relativeX < rect.width / 2) {
			goPrev();
		} else {
			goNext();
		}
	};

	const handleDragEnd = (
		_: MouseEvent | TouchEvent | PointerEvent,
		info: { offset: { x: number }; velocity: { x: number } }
	) => {
		const swipeThreshold = 90;
		const velocityThreshold = 400;

		if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
			goNext();
		} else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
			goPrev();
		} else {
			dragX.set(0);
		}
	};

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (isVideoFullscreen) {
					setIsVideoFullscreen(false);
				} else {
					onClose();
				}
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
							className="label-text absolute right-6 top-6 z-10 text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)] md:right-10 md:top-10"
						>
							Close ✕
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
				className="label-text absolute right-6 top-6 z-20 text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)] md:right-10 md:top-10"
			>
				Close ✕
			</button>

			<motion.div
				className="relative flex w-full max-w-[720px] flex-col items-center"
				initial={{ y: 40, opacity: 0, scale: 0.94 }}
				animate={{ y: 0, opacity: 1, scale: 1 }}
				exit={{ y: 20, opacity: 0, scale: 0.96 }}
				transition={SPRING}
				onClick={(e) => e.stopPropagation()}
			>
				<p className="label-text mb-6 text-[var(--paper)]/60">
					{project.name} — {String(index + 1).padStart(2, '0')} /{' '}
					{String(total).padStart(2, '0')}
				</p>

				<div
					ref={containerRef}
					className={`relative aspect-[16/10] w-full ${isVideo ? 'cursor-default' : 'cursor-none'}`}
					onMouseMove={(e) => {
						if (!isVideo) handleMouseMove(e);
					}}
					onMouseLeave={() => setCursorSide(null)}
				>
					{/* peeking stack behind the top card */}
					{project.media.map((item, i) => {
						const offset = (i - index + total) % total;
						if (offset === 0 || offset > 2) return null;

						return (
							<motion.div
								key={item.src}
								className="absolute inset-0 overflow-hidden bg-[var(--ink)] bg-cover bg-center shadow-2xl"
								style={{
									backgroundImage:
										item.type === 'image'
											? `url('${item.src}')`
											: `url('/images/video-poster-fallback.jpg')`,
								}}
								animate={{
									scale: 1 - offset * 0.055,
									y: offset * 16,
									rotate: offset % 2 === 0 ? 1.5 : -1.5,
									opacity: 1 - offset * 0.3,
									zIndex: total - offset,
								}}
								transition={SPRING}
							/>
						);
					})}

					{/* top, interactive card */}
					<AnimatePresence initial={false} custom={direction} mode="wait">
						<motion.div
							key={activeItem.src}
							className="absolute inset-0 overflow-hidden bg-[var(--ink)] shadow-2xl"
							style={{ x: dragX, zIndex: total + 1 }}
							custom={direction}
							variants={slideVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={SPRING}
							drag={isVideo ? false : 'x'}
							dragElastic={0.5}
							dragConstraints={{ left: 0, right: 0 }}
							onDragEnd={isVideo ? undefined : handleDragEnd}
							onClick={isVideo ? undefined : handleCardClick}
						>
							{activeItem.type === 'video' ? (
								<div className="relative h-full w-full bg-black">
									<video
										src={activeItem.src}
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
										className="label-text absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1.5 text-[var(--paper)] transition-colors hover:bg-black/80"
									>
										Expand ⤢
									</button>
								</div>
							) : (
								<div
									className="h-full w-full bg-cover bg-center"
									style={{ backgroundImage: `url('${activeItem.src}')` }}
								/>
							)}
							<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
						</motion.div>
					</AnimatePresence>

					{/* custom cursor */}
					{!isVideo && cursorSide && (
						<motion.div
							className="pointer-events-none fixed z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--ink)]"
							style={{ left: smoothX, top: smoothY }}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							transition={{ type: 'spring', stiffness: 500, damping: 30 }}
						>
							<span className="label-text text-base">
								{cursorSide === 'left' ? '←' : '→'}
							</span>
						</motion.div>
					)}
				</div>

				<div className="mt-8 flex items-center gap-6">
					<button
						onClick={goPrev}
						className="label-text text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)]"
					>
						← Prev
					</button>

					<div className="flex gap-1.5">
						{project.media.map((_, i) => (
							<button
								key={i}
								aria-label={`Go to item ${i + 1}`}
								onClick={() => {
									setDirection(i > index ? 1 : -1);
									setIndex(i);
									dragX.set(0);
								}}
								className={`h-1 w-6 transition-colors ${
									i === index ? 'bg-[var(--paper)]' : 'bg-[var(--paper)]/25 hover:bg-[var(--paper)]/50'
								}`}
							/>
						))}
					</div>

					<button
						onClick={goNext}
						className="label-text text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)]"
					>
						Next →
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default function SelectedWork() {
	const [activeProject, setActiveProject] = useState<Project | null>(null);

	return (
		<section
			id="work"
			data-nav-theme="light"
			className="bg-[var(--paper)] px-6 py-24 md:px-12 md:py-28 lg:px-20"
		>
			<div className="mx-auto w-full max-w-[1700px]">
				<div className="mb-10 flex items-end justify-between border-b border-[var(--border)] pb-8">
					<p className="label-text text-[var(--ink)]">Selected Work</p>
					<p className="label-text text-[var(--muted)]">2023 - 2025</p>
				</div>

				<div className="space-y-16 md:space-y-20 lg:space-y-28">
					{projects.map((project, index) => {
						const reverse = index % 2 === 1;

						return (
							<article key={project.name} className="border-t border-[var(--border)] pt-8 md:pt-12">
								<div className="grid gap-6 md:gap-8 lg:grid-cols-[80px_1fr_1.25fr] lg:items-start">
									<ScrollReveal className="hidden lg:block">
										<p className="label-text mt-2 text-[var(--border-strong)]">{project.id}</p>
									</ScrollReveal>

									<div className={reverse ? 'lg:order-2' : ''}>
										<ScrollReveal>
											<p className="label-text text-[var(--muted)]">
												{project.category} - {project.year}
											</p>
										</ScrollReveal>

										<ScrollReveal>
											<h3 className="mt-4 text-[clamp(36px,10vw,52px)] font-black leading-[0.9] tracking-[-0.035em] text-[var(--ink)] md:text-[clamp(44px,5.5vw,84px)]">
												{project.name}
											</h3>
										</ScrollReveal>

										<ScrollReveal>
											<p className="mt-5 max-w-lg text-sm font-normal leading-[1.65] text-[var(--ink-soft)] md:text-[15px]">
												{project.description}
											</p>
										</ScrollReveal>

										<ScrollReveal>
											<ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--muted)] md:text-[11px]">
												{project.tech.map((item) => (
													<li key={item}>{item}</li>
												))}
											</ul>
										</ScrollReveal>
									</div>

									<ScrollReveal className={reverse ? 'lg:order-1' : ''}>
										<div
											role="button"
											tabIndex={0}
											onClick={() => setActiveProject(project)}
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') {
													e.preventDefault();
													setActiveProject(project);
												}
											}}
											className="group relative mt-2 aspect-[16/10] cursor-pointer overflow-hidden bg-[var(--ink)] bg-cover bg-center grayscale lg:mt-0"
											style={{ backgroundImage: `url('${project.media[0].src}')` }}
										>
											<div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,transparent_0%,rgba(0,0,0,0.52)_100%)]" />
											{project.media.length > 1 && (
												<div className="absolute inset-0 flex items-end justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
													<span className="label-text text-[var(--paper)]">
														View Gallery ({project.media.length})
													</span>
												</div>
											)}
										</div>
									</ScrollReveal>
								</div>
							</article>
						);
					})}
				</div>
			</div>

			<AnimatePresence>
				{activeProject && (
					<ImageStackViewer project={activeProject} onClose={() => setActiveProject(null)} />
				)}
			</AnimatePresence>
		</section>
	);
}