export default function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="relative border-t border-white/10 bg-[var(--ink)] px-6 py-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white/22 md:flex-row md:items-center md:justify-between md:gap-6 md:text-[11px]">
        <p>Copyright {new Date().getFullYear()} Vergel B. Villaranda</p>

        <p>Designed and Built by Ver.dev</p>
      </div>
    </footer>
  );
}