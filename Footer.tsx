import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-black bg-white text-black font-mono mt-20">
      {/* Running Marquee / Ticker Line */}
      <div className="border-b border-black py-2 px-4 bg-black text-white text-[11px] overflow-hidden whitespace-nowrap flex items-center space-x-6 select-none">
        <span className="text-[#39FF14] font-bold">● SYSTEM STATUS: AUTONOMOUS</span>
        <span>//</span>
        <span>NO AI GENERATION</span>
        <span>//</span>
        <span>100% LOCAL BROWSER CALCULATIONS</span>
        <span>//</span>
        <span>ZERO TRACKING COOKIES</span>
        <span>//</span>
        <span>WCAG 2.1 MATHEMATICAL VERIFICATION</span>
        <span>//</span>
        <span>COLORVAULT CHROMATIC STUDIO</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Big Colophon / Brand Block (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-[#2020FF] inline-block border border-black" />
              <h3 className="font-display font-extrabold text-2xl tracking-tighter uppercase">
                COLORVAULT
              </h3>
            </div>
            <p className="text-xs uppercase leading-relaxed text-neutral-600 max-w-sm">
              An independent, brutalist online color studio and chromatic archive. Built for graphic designers, software engineers, and digital typographers who require exact mathematical color manipulation without SaaS clutter.
            </p>
            <div className="border border-black p-3 bg-[#EEEEEE] text-[10px] space-y-1">
              <div className="flex justify-between font-bold">
                <span>SPECIFICATION</span>
                <span className="text-[#2020FF]">W3C WCAG 2.1</span>
              </div>
              <div className="flex justify-between">
                <span>DATABASE</span>
                <span>NONE (CLIENT LOCALSTORAGE)</span>
              </div>
              <div className="flex justify-between">
                <span>LICENSE</span>
                <span>FREE UTILITY (OPEN ACCESS)</span>
              </div>
            </div>
          </div>

          {/* Directory Index 01: Tools (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="border-b border-black pb-1 text-xs font-bold uppercase tracking-widest text-neutral-500">
              [ DIRECTORY // TOOLS ]
            </div>
            <ul className="space-y-1.5 text-xs uppercase font-bold">
              <li>
                <Link to="/generator" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  01. Palette Generator
                </Link>
              </li>
              <li>
                <Link to="/picker" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  02. Color Picker & Probe
                </Link>
              </li>
              <li>
                <Link to="/harmony" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  03. Color Harmony
                </Link>
              </li>
              <li>
                <Link to="/contrast" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  04. Contrast Checker
                </Link>
              </li>
              <li>
                <Link to="/gradient" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  05. Gradient Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Index 02: Archives & Legal (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="border-b border-black pb-1 text-xs font-bold uppercase tracking-widest text-neutral-500">
              [ ARCHIVE & LEGAL PROTOCOL ]
            </div>
            <ul className="space-y-1.5 text-xs uppercase font-bold">
              <li>
                <Link to="/explore" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  &rarr; Curated Gallery (36 Palettes)
                </Link>
              </li>
              <li>
                <Link to="/vault" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  &rarr; My Vault [Device Dossier]
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  &rarr; About / Manifesto
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  &rarr; Privacy Statement
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  &rarr; Terms of Operation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:bg-black hover:text-white px-1 py-0.5 block border border-transparent hover:border-black">
                  &rarr; Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-4">
          <div className="font-mono uppercase">
            &copy; {new Date().getFullYear()} COLORVAULT STUDIO. ALL GENERATED CHROMATIC VALUES ARE PUBLIC DOMAIN.
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-bold">
            <span className="px-2 py-0.5 bg-[#EEEEEE] border border-black text-black">
              NO_AI_ENGINE
            </span>
            <span className="px-2 py-0.5 bg-[#EEEEEE] border border-black text-black">
              100%_CLIENT_SIDE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
