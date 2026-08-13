import ScrollReveal from '@/components/animations/ScrollReveal';

const roles = [
	{
		id: '01',
		title: 'Full Stack Developer Intern',
		company: 'Socia',
		period: 'FEB 2026 - APRIL 2026',
		location: 'BGC - MANILA',
	},
	{
		id: '02',
		title: 'Full Stack Developer',
		company: 'PoweassistVA',
		period: 'FREELANCE',
		location: 'REMOTE',
	},
	{
		id: '03',
		title: 'IoT Hardware & Embedded Systems Developer',
		company: 'Pondmate - Academic/Capstone Project',
		period: '2025 - 2026',
		location: 'Camarines Norte - Philippines',
	},

];

export default function Experience() {
	return (
		<section
			id="experience"
			data-nav-theme="dark"
			className="bg-[var(--ink)] px-6 py-24 text-[var(--paper)] md:px-12 md:py-28 lg:px-20"
		>
			<div className="mx-auto w-full max-w-[1700px]">
				<ScrollReveal>
					<p className="label-text text-white/45">Experience</p>
				</ScrollReveal>

				<ScrollReveal>
					<h2 className="display-title mt-8 text-[clamp(40px,12vw,64px)] md:text-[clamp(56px,9vw,130px)]">
						Experience
					</h2>
				</ScrollReveal>

				<div className="mt-12 md:mt-14">
					{roles.map((role) => (
						<ScrollReveal key={role.id}>
							<article className="border-t border-white/10 py-6 md:grid md:grid-cols-[80px_1fr_auto] md:items-start md:gap-6 md:py-8">
								<p className="label-text hidden text-white/22 md:mt-1 md:block">{role.id}</p>

								<div>
									<h3 className="text-[15px] font-medium leading-normal tracking-normal text-white/92 md:text-[18px]">
										{role.title}
									</h3>
									<p className="mt-2 text-[15px] font-normal leading-normal text-white/35 md:text-[18px]">
										{role.company}
									</p>
								</div>

								<div className="mt-3 text-left md:mt-0 md:text-right">
									<p className="text-[15px] font-normal text-white/45 md:text-[18px]">{role.period}</p>
									<p className="label-text mt-2 text-white/24">{role.location}</p>
								</div>
							</article>
						</ScrollReveal>
					))}
				</div>
			</div>
		</section>
	);
}
