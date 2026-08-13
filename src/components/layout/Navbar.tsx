import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-[5vw] py-[26px] mix-blend-difference">
      <nav className="flex items-center justify-between text-white">
        <Link
          href="/"
          className="text-[13px] font-bold uppercase tracking-[0.18em]"
        >
          Ver.dev
        </Link>

        <div className="flex gap-10 text-[11px] font-medium uppercase tracking-[0.18em] opacity-70">
          <a href="#work">Work</a>
          <a href="#about">Info</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </header>
  );
}