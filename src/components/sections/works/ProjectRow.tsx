import ScrollReveal from '@/components/animations/ScrollReveal';
import type { Project } from './types';

export default function ProjectRow({
	project,
	reverse,
	onOpen,
}: {
	project: Project;
	reverse: boolean;
	onOpen: (project: Project) => void;
}) {
	return (
		<article className="border-t border-[var(--border)] pt-8 md:pt-12">
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
						onClick={() => onOpen(project)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								onOpen(project);
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
}