"use client";

import { useRef, useState } from "react";
import ScrollReveal from '@/components/animations/ScrollReveal';
import { HugeiconsIcon } from "@hugeicons/react";
import {
	Mail01Icon,
	Linkedin01Icon,
	Facebook01Icon,
	GithubIcon,
} from "@hugeicons/core-free-icons";

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "vergel@villaranda.com";
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com";
const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com";
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com";

function SocialLink({
	href,
	label,
	icon,
}: {
	href: string;
	label: string;
	icon: Parameters<typeof HugeiconsIcon>[0]["icon"];
}) {
	if (!href) return null;

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center gap-2 text-white/55 transition-colors hover:text-white"
			aria-label={label}
		>
			<HugeiconsIcon icon={icon} size={16} color="currentColor" strokeWidth={1.75} />
			<span>{label}</span>
		</a>
	);
}

export default function Contact() {
	const [toastVisible, setToastVisible] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleCopyEmail = async () => {
		if (!EMAIL) return;
		try {
			await navigator.clipboard.writeText(EMAIL);
		} catch {
			const el = document.createElement("textarea");
			el.value = EMAIL;
			el.style.position = "fixed";
			el.style.opacity = "0";
			document.body.appendChild(el);
			el.focus();
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		}

		setToastVisible(true);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setToastVisible(false), 2000);
	};

	return (
		<section
			id="contact"
			data-nav-theme="dark"
			className="bg-[var(--ink)] px-6 pt-24 text-[var(--paper)] md:px-12 md:pt-28 lg:px-20"
		>
			<div className="mx-auto w-full max-w-[1700px]">
				<ScrollReveal>
					<p className="label-text text-white/35">Get in touch</p>
				</ScrollReveal>

				<ScrollReveal>
					<h2 className="mt-8 max-w-5xl text-[clamp(36px,11vw,56px)] font-black leading-[0.88] tracking-[-0.04em] md:text-[clamp(48px,8vw,120px)]">
						Let&apos;s build something worth noticing.
					</h2>
				</ScrollReveal>

				<div className="mt-14 grid gap-8 border-b border-white/10 pb-16 md:mt-16 md:grid-cols-[1fr_auto] md:items-end md:gap-10 md:pb-20">
					{EMAIL && (
						<button
							type="button"
							onClick={handleCopyEmail}
							className="group inline-flex items-center gap-2 text-[15px] font-normal tracking-[-0.01em] text-white/95 transition hover:text-white md:text-[clamp(16px,2.2vw,28px)]"
							aria-label="Copy email address"
						>
							<HugeiconsIcon icon={Mail01Icon} size={18} color="currentColor" strokeWidth={1.75} />
							<span className="border-b border-white/20 pb-3">{EMAIL}</span>
						</button>
					)}

					<div className="flex flex-col gap-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 md:flex-row md:gap-8 md:text-[11px] md:justify-end">
						<SocialLink href={LINKEDIN_URL} label="LinkedIn" icon={Linkedin01Icon} />
						<SocialLink href={FACEBOOK_URL} label="Facebook" icon={Facebook01Icon} />
						<SocialLink href={GITHUB_URL} label="GitHub" icon={GithubIcon} />
					</div>
				</div>

				<div
					aria-live="polite"
					className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
						toastVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
					}`}
				>
					<div className="rounded-full border border-white/10 bg-[var(--ink)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-white shadow-lg shadow-black/40">
						Email copied
					</div>
				</div>
			</div>
		</section>
	);
}
