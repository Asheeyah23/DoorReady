import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-paper/85 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-teal-50 font-display text-sm">
            D
          </span>
          <span className="font-display font-semibold text-lg text-teal-950">DoorReady</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-soft">
          <Link href="/#how" className="hover:text-teal-700">How it works</Link>
          <Link href="/#features" className="hover:text-teal-700">Features</Link>
          <Link href="/dashboard" className="hover:text-teal-700">Dashboard</Link>
        </nav>
        <Link
          href="/dashboard"
          className="text-sm font-semibold text-white bg-teal-700 hover:bg-teal-600 transition rounded-full px-4 py-2"
        >
          Try the demo
        </Link>
      </div>
    </header>
  );
}
