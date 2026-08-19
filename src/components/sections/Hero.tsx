'use client';

import HeroAnimation from '@/components/animations/HeroAnimation';
import TextReveal from '@/components/animations/TextReveal';
import TechTicker from '@/components/animations/TechTicker';

export default function Hero() {
	return (
		<section className="relative isolate min-h-screen overflow-hidden bg-[#111111] px-6 pb-16 pt-24 text-white md:px-12 md:pt-32 lg:px-20">
			<div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-[1700px] flex-col justify-between">
				<div className="relative">
					<div className="mx-auto mb-8 w-full max-w-[260px] md:absolute md:right-0 md:top-[14%] md:mb-0 md:max-w-[310px]">
						<div
							data-no-trail
							className="profile-image-card relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(155deg,#2a2a2a_0%,#212121_45%,#1a1a1a_100%)] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.28)]"
						>
							<img
								src="/award2.jpeg"
								alt="Vergel Villaranda"
								className="profile-image profile-image--base aspect-[4/5] w-full rounded-[1.1rem] object-cover object-center grayscale"
							/>
							<img
								src="/award1.jpeg"
								alt="Vergel Villaranda alternate"
								className="profile-image profile-image--hover aspect-[4/5] w-full rounded-[1.1rem] object-cover object-center grayscale"
							/>
						</div>
					</div>

					<div className="md:w-[60%]">
						<TextReveal>
							<p className="label-text mb-8 text-white/45">
								Full-Stack Developer & IT Solutions - 2026
							</p>
						</TextReveal>

						<TextReveal delay={0.12}>
							<h1 className="hero-name-stack display-title">
								<span>VERGEL</span>
								<span>VILLARANDA</span>
							</h1>
						</TextReveal>
					</div>
				</div>

				<TextReveal delay={0.5}>
					<div className="mt-14 grid gap-4 border-t border-white/10 pt-7 md:grid-cols-[1fr_auto] md:items-end md:gap-14">
						<p className="body-copy max-w-xl text-white/45">
							Building digital solutions, connecting technology, and turning ideas into reality.
						</p>
						<p className="label-text text-white/50">Scroll Down</p>
					</div>
				</TextReveal>
			</div>

			<TechTicker />

			<HeroAnimation />
		</section>
	);
}