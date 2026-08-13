import ScrollReveal from '@/components/animations/ScrollReveal';

const capabilities = [
  'JavaScript and TypeScript',
  'Figma and Prototyping',
  'React, Next.js, and Tailwind CSS',
  'MySQL and PostgreSQL',
  'Arduino and IoT Development',
];

export default function About() {
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="bg-[var(--paper)] px-6 py-24 md:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-[1700px] gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <ScrollReveal>
            <p className="label-text text-[var(--muted)]">About</p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="mt-8 max-w-2xl text-[clamp(40px,7vw,68px)] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
              Developer and builder working across program, hardware, and creativity. I build Web Apps, and Iot solutions that turn ideas into practical technology. 
            </h2>
          </ScrollReveal>
        </div>

        <div>
          <ScrollReveal>
            <p className="max-w-2xl text-[20px] font-normal leading-[1.55] tracking-[-0.01em] text-[var(--ink-soft)] md:text-[22px]">
              I build digital and physical solutions-from responsive web applications and backend systems to Iot devices and automated hardware.
              I enjoy turning ideas into functional products for better scalability.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-x-7 gap-y-1 sm:grid-cols-2">
            {capabilities.map((skill) => (
              <ScrollReveal key={skill}>
                <p className="border-t border-[var(--border)] py-4 text-[16px] font-medium leading-normal text-[var(--ink)] md:text-[18px]">
                  {skill}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}