"use client";

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pb-8 pt-2 transition-colors">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-secondary">
          <div>
            <p>© {currentYear} Guganraj Rengaraju. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/mrtuxcoder"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/guganraj-rengaraju/"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://x.com/mrtuxcoder"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
